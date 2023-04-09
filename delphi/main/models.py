from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from main.apis.movies import Movies
from main.apis.shows import Shows


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    movies = models.ManyToManyField('Movie')
    shows = models.ManyToManyField('Show')
    picture = models.ImageField(upload_to='profile_pics', default='default.jpg')

    def __str__(self) -> str:
        return self.user.username

    def __repr__(self) -> str:
        return f'<Profile: {self.user.username}>'


class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    rated = models.CharField(max_length=10)
    released = models.CharField(max_length=20)
    runtime = models.CharField(max_length=10)
    genre = models.CharField(max_length=50)
    director = models.CharField(max_length=200)
    writer = models.CharField(max_length=200)
    actors = models.CharField(max_length=200)
    plot = models.CharField(max_length=1000)
    language = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    awards = models.CharField(max_length=200)
    poster_url = models.URLField()
    ratings = models.JSONField(null=True)
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1)
    imdb_votes = models.CharField(max_length=10)
    imdb_id = models.CharField(max_length=10, primary_key=True)
    box_office = models.CharField(max_length=20)
    production = models.CharField(max_length=200)
    website = models.URLField()

    USER_CATEGORIES = [
        ("WATCHING", "Watching"),
        ("PLAN_TO_WATCH", "Planning to watch"),
        ("WATCHED", "Watched"),
    ]

    user_category = models.CharField(max_length=100, choices=USER_CATEGORIES, default="PLAN_TO_WATCH")
    user_rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=1.0)

    def refresh(self):
        movie_data = Movies.get_movie(self.imdb_id)

        # Update the movie's fields with the new data
        self.title = movie_data['title']
        self.year = movie_data['year']
        self.rated = movie_data['rated']
        self.released = movie_data['released']
        self.runtime = movie_data['runtime']
        self.genre = movie_data['genre']
        self.director = movie_data['director']
        self.writer = movie_data['writer']
        self.actors = movie_data['actors']
        self.plot = movie_data['plot']
        self.language = movie_data['language']
        self.country = movie_data['country']
        self.awards = movie_data['awards']
        self.poster_url = movie_data['poster_url']
        self.ratings = movie_data['ratings']
        self.imdb_rating = movie_data['imdb_rating']
        self.imdb_votes = movie_data['imdb_votes']
        self.imdb_id = movie_data['imdb_id']
        self.box_office = movie_data['box_office']
        self.production = movie_data['production']
        self.website = movie_data['website']
        self.save()


class Show(models.Model):
    title = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    rated = models.CharField(max_length=10)
    released = models.CharField(max_length=20)
    runtime = models.CharField(max_length=10)
    genre = models.CharField(max_length=50)
    director = models.CharField(max_length=200)
    writer = models.CharField(max_length=200)
    actors = models.CharField(max_length=200)
    plot = models.CharField(max_length=1000)
    language = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    awards = models.CharField(max_length=200)
    poster_url = models.URLField()
    ratings = models.TextField()
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1)
    imdb_votes = models.CharField(max_length=10)
    imdb_id = models.CharField(max_length=10, primary_key=True)
    total_seasons = models.CharField(max_length=5)

    USER_CATEGORIES = [
        ("WATCHING", "Watching"),
        ("PLAN_TO_WATCH", "Planning to watch"),
        ("WATCHED", "Watched"),
    ]

    user_category = models.CharField(max_length=100, choices=USER_CATEGORIES, default="PLAN_TO_WATCH")
    user_rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=1.0)

    def refresh(self):
        show_data = Shows.get_show(self.imdb_id)

        # Update the show's fields with the new data
        self.title = show_data['title']
        self.year = show_data['year']
        self.rated = show_data['rated']
        self.released = show_data['released']
        self.runtime = show_data['runtime']
        self.genre = show_data['genre']
        self.director = show_data['director']
        self.writer = show_data['writer']
        self.actors = show_data['actors']
        self.plot = show_data['plot']
        self.language = show_data['language']
        self.country = show_data['country']
        self.awards = show_data['awards']
        self.poster_url = show_data['poster_url']
        self.ratings = show_data['ratings']
        self.imdb_rating = show_data['imdb_rating']
        self.imdb_votes = show_data['imdb_votes']
        self.imdb_id = show_data['imdb_id']
        self.total_seasons = show_data['total_seasons']
        self.save()

    def __str__(self):
        return self.title
    
    def __repr__(self):
        return f"<Show: {self.title}>"

