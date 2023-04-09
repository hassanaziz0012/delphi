from django.urls import path
from main import views

urlpatterns = [
    path('movies/search/', views.SearchMoviesView.as_view(), name='search_movies'),
    path('movies/<str:imdb_id>/', views.GetMovieView.as_view(), name='get_movie'),
    path('shows/search/', views.SearchShowsView.as_view(), name='search_shows'),
    path('shows/<str:imdb_id>/', views.GetShowView.as_view(), name='get_show'),

    path("profile/movies/add/", views.AddMovieToProfileView.as_view(), name="add-movie-to-profile"),
    path("profile/movies/remove/", views.RemoveMovieFromProfileView.as_view(), name="remove-movie-from-profile"),
    path("profile/shows/add/", views.AddShowToProfileView.as_view(), name="add-show-to-profile"),
    path("profile/shows/remove/", views.RemoveShowFromProfileView.as_view(), name="remove-show-from-profile"),

    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
]
