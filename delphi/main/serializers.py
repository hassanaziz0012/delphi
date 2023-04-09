from rest_framework import serializers
from main.models import Profile, Movie, Show
from django.contrib.auth.models import User


class MovieSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    year = serializers.CharField(max_length=4, required=False)
    rated = serializers.CharField(max_length=10, required=False)
    released = serializers.CharField(max_length=20, required=False)
    runtime = serializers.CharField(max_length=10, required=False)
    genre = serializers.CharField(max_length=50, required=False)
    director = serializers.CharField(max_length=200, required=False)
    writer = serializers.CharField(max_length=200, required=False)
    actors = serializers.CharField(max_length=200, required=False)
    plot = serializers.CharField(max_length=1000, required=False)
    language = serializers.CharField(max_length=50, required=False)
    country = serializers.CharField(max_length=50, required=False)
    awards = serializers.CharField(max_length=200, required=False)
    poster_url = serializers.URLField()
    ratings = serializers.ListField(child=serializers.DictField(), required=False)
    imdb_rating = serializers.DecimalField(max_digits=3, decimal_places=1, required=False)
    imdb_votes = serializers.CharField(max_length=10, required=False)
    imdb_id = serializers.CharField(max_length=10)

    USER_CATEGORIES = [
        ("WATCHING", "Watching"),
        ("PLAN_TO_WATCH", "Planning to watch"),
        ("WATCHED", "Watched"),
    ]

    user_category = serializers.CharField(max_length=25, required=False, source="get_user_category_display")
    user_rating = serializers.FloatField(default=1.0, required=False)


class ShowSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    year = serializers.CharField(max_length=4, required=False)
    rated = serializers.CharField(max_length=10, required=False)
    released = serializers.CharField(max_length=20, required=False)
    runtime = serializers.CharField(max_length=10, required=False)
    genre = serializers.CharField(max_length=50, required=False)
    director = serializers.CharField(max_length=200, required=False)
    writer = serializers.CharField(max_length=200, required=False)
    actors = serializers.CharField(max_length=200, required=False)
    plot = serializers.CharField(max_length=1000, required=False)
    language = serializers.CharField(max_length=50, required=False)
    country = serializers.CharField(max_length=50, required=False)
    awards = serializers.CharField(max_length=200, required=False)
    poster_url = serializers.URLField(required=False)
    ratings = serializers.ListField(child=serializers.DictField(), required=False)
    imdb_rating = serializers.DecimalField(max_digits=3, decimal_places=1, required=False)
    imdb_votes = serializers.CharField(max_length=10, required=False)
    imdb_id = serializers.CharField(max_length=10)
    total_seasons = serializers.CharField(max_length=5, required=False)

    USER_CATEGORIES = [
        ("WATCHING", "Watching"),
        ("PLAN_TO_WATCH", "Planning to watch"),
        ("WATCHED", "Watched"),
    ]

    user_category = serializers.CharField(max_length=25, required=False, source="get_user_category_display")
    user_rating = serializers.FloatField(default=1.0, required=False)


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}


class ProfileSerializer(serializers.ModelSerializer):
    movies = serializers.PrimaryKeyRelatedField(many=True, queryset=Movie.objects.all())
    shows = serializers.PrimaryKeyRelatedField(many=True, queryset=Show.objects.all())
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')

    class Meta:
        model = Profile
        fields = ['movies', 'shows', 'username', 'email', 'picture']

