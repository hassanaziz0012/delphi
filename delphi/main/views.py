from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import generics, authentication, permissions, response, status
from django.contrib.auth import authenticate, login
from django.core.files.base import ContentFile
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from main.models import Profile, Movie, Show
from main.serializers import MovieSerializer, ShowSerializer, UserSerializer, ProfileSerializer
from main.apis.movies import Movies
from main.apis.shows import Shows
import base64


class SearchMoviesView(ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        movies = Movies.search_movies(query)
        return movies


class GetMovieView(APIView):
    serializer_class = MovieSerializer

    def get(self, request, imdb_id, format=None):
        print(request.user, request.user.is_authenticated)
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            print("User is authenticated.")
            if profile.movies.filter(imdb_id=imdb_id).exists():
                print("Getting movie from database, not API.")
                movie = profile.movies.get(imdb_id=imdb_id)
        else:
            movie = Movies.get_movie(imdb_id)

        serializer = self.serializer_class(movie)
        return response.Response(serializer.data)


class SearchShowsView(ListAPIView):
    serializer_class = ShowSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        shows = Shows.search_shows(query)
        return shows


class GetShowView(RetrieveAPIView):
    serializer_class = ShowSerializer

    def get(self, request, imdb_id, format=None):
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            if profile.shows.filter(imdb_id=imdb_id).exists():
                show = profile.shows.get(imdb_id=imdb_id)
        else:
            show = Shows.get_show(imdb_id)
        
        serializer = self.serializer_class(show)
        return response.Response(serializer.data)


class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        # Create a new user
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.save()

            # Create a token for the user
            token = Token.objects.create(user=user)
            token.save()
            
            # Create a profile for the user
            profile = Profile.objects.create(user=user)
            profile.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        # Authenticate the user
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            # Get or Create a token for the user
            token, created = Token.objects.get_or_create(user=user)
            return response.Response({'token': token.key}, status=status.HTTP_200_OK)

        else:
            return response.Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = get_object_or_404(Profile, user=request.user)
        serializer = ProfileSerializer(profile)
        return response.Response(serializer.data)

    def put(self, request):
        user = get_object_or_404(User, pk=request.user.id)
        
        if request.data.get('username') != '':
            user.username = request.data.get('username', user.username)

        if request.data.get('email') != '':
            user.email = request.data.get('email', user.email)

        if request.data.get('password') != '':
            user.set_password(request.data.get('password', user.password))

        user.save()
        picture: str = request.data.get('picture')

        if picture:
            data = base64.b64decode(picture)
            filename = f"{user.username}-profile-picture.jpg"
            _file = ContentFile(data, filename)

            profile = Profile.objects.get(user=user)
            profile.picture.save(filename, _file)

        return response.Response({'status': 'success'})


class AddMovieToProfileView(generics.CreateAPIView):
    serializer_class = MovieSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        imdb_id = request.data.get("imdb_id")
        category = request.data.get('category')
        rating = request.data.get('rating')

        try:
            # Try to get the movie from the database
            movie = Movie.objects.get(imdb_id=imdb_id)
        except Movie.DoesNotExist:
            # If the movie doesn't exist in the database, try to get it from the API
            movie_data = Movies.get_movie(imdb_id)
            if movie_data is None:
                return response.Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # Create a new movie object from the API data
            movie = Movie(**movie_data)
            movie.save()
            
        if category:
            movie.user_category = category
        if rating:
            movie.user_rating = rating
        movie.save(update_fields=['user_category', 'user_rating'])
        
        profile = Profile.objects.get(user=request.user)
        profile.movies.add(movie)
        return response.Response(MovieSerializer(movie).data, status=status.HTTP_201_CREATED)


class RemoveMovieFromProfileView(generics.DestroyAPIView):
    serializer_class = MovieSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        imdb_id = request.data.get("imdb_id")
        try:
            movie = Movie.objects.get(imdb_id=imdb_id)
        except Movie.DoesNotExist:
            return response.Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get the user's profile
        profile = Profile.objects.get(user=request.user)
        profile.movies.remove(movie)
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class AddShowToProfileView(generics.CreateAPIView):
    serializer_class = ShowSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        imdb_id = request.data.get("imdb_id")
        category = request.data.get('category')
        rating = request.data.get('rating')

        try:
            show = Show.objects.get(imdb_id=imdb_id)
        except Show.DoesNotExist:
            # If the show doesn't exist in the database, try to get it from the API
            show_data = Shows.get_show(imdb_id)
            if show_data is None:
                return response.Response({"error": "Show not found"}, status=status.HTTP_404_NOT_FOUND)

            # Create a new show object from the API data
            show = Show(**show_data)
            show.save()

        if category:
            show.user_category = category
        if rating:
            show.user_rating = rating
        show.save(update_fields=['user_category', 'user_rating'])

        # Get the user's profile
        profile = Profile.objects.get(user=request.user)
        profile.shows.add(show)
        return response.Response(ShowSerializer(show).data, status=status.HTTP_201_CREATED)


class RemoveShowFromProfileView(generics.DestroyAPIView):
    serializer_class = ShowSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        imdb_id = request.data.get("imdb_id")
        try:
            show = Show.objects.get(imdb_id=imdb_id)
        except Show.DoesNotExist:
            return response.Response({"error": "Show not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get the user's profile
        profile = Profile.objects.get(user=request.user)
        profile.shows.remove(show)
        return response.Response(status=status.HTTP_204_NO_CONTENT)
