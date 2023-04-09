import requests
from django.conf import settings


class Shows:
    API_KEY = settings.OMDB_API_KEY

    @staticmethod
    def search_shows(query, all_pages=False):
        # Set the API endpoint
        API_ENDPOINT = "http://www.omdbapi.com/"

        # Set the API key in the query string
        params = {
            "apikey": Shows.API_KEY,
            "s": query,
            "type": "series",
            "page": 1
        }

        # Set a flag to indicate whether all pages have been searched
        all_pages_searched = False

        # Set a list to store the results
        results = []

        # Search for shows until all pages have been searched
        while not all_pages_searched:
            # Make the GET request to the API's endpoint
            response = requests.get(API_ENDPOINT, params=params)

            # Check the status code to make sure the request was successful
            if response.status_code == 200:
                # Parse the response data
                data = response.json()

                # Check if the response indicates an error
                if data['Response'] == "False":
                    # Exit the loop and return the results
                    all_pages_searched = True
                else:
                    # Extract the relevant information from the data
                    for item in data['Search']:
                        title = item['Title']
                        imdb_id = item['imdbID']
                        year = item['Year']
                        poster_url = item['Poster']
                        result = {
                            "title": title,
                            "imdb_id": imdb_id,
                            "year": year,
                            "poster_url": poster_url
                        }
                        results.append(result)

                    # Check if all pages have been searched
                    if not all_pages or data['totalResults'] == len(results):
                        all_pages_searched = True
                    else:
                        # Move to the next page
                        params["page"] += 1
            else:
                print("Request failed with status code: ", response.status_code)
                all_pages_searched = True

        return results

    @staticmethod
    def get_show(imdb_id):
        # Set the API endpoint
        API_ENDPOINT = "http://www.omdbapi.com/"

        # Set the API key and the IMDb ID in the query string
        params = {
            "apikey": Shows.API_KEY,
            "i": imdb_id,
            "plot": "full"
        }

        # Make the GET request to the API's endpoint
        response = requests.get(API_ENDPOINT, params=params)

        # Check the status code to make sure the request was successful
        if response.status_code == 200:
            # Parse the response data
            data = response.json()

            try:
                # Extract the relevant information from the data
                title = data['Title']
                year = data['Year']
                rated = data['Rated']
                released = data['Released']
                runtime = data['Runtime']
                genre = data['Genre']
                director = data['Director']
                writer = data['Writer']
                actors = data['Actors']
                plot = data['Plot']
                language = data['Language']
                awards = data['Awards']
                poster_url = data['Poster']
                imdb_rating = data['imdbRating']
                imdb_votes = data['imdbVotes']
                imdb_id = data['imdbID']
                total_seasons = data['totalSeasons']
                result = {
                    "title": title,
                    "year": year,
                    "rated": rated,
                    "released": released,
                    "runtime": runtime,
                    "genre": genre,
                    "director": director,
                    "writer": writer,
                    "actors": actors,
                    "plot": plot,
                    "language": language,
                    "awards": awards,
                    "poster_url": poster_url,
                    "imdb_rating": imdb_rating,
                    "imdb_votes": imdb_votes,
                    "imdb_id": imdb_id,
                    "total_seasons": total_seasons
                }
                return result
                
            except KeyError:
                return None
        else:
            print("Request failed with status code: ", response.status_code)
            return None
