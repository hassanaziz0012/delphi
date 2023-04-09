import requests
from django.conf import settings


class Episodes:
    API_KEY = settings.OMDB_API_KEY

    @staticmethod
    def get_episodes(imdb_id):
        # Set the API endpoint
        API_ENDPOINT = "http://www.omdbapi.com/"

        # Set the API key and the IMDb ID in the query string
        params = {
            "apikey": Episodes.API_KEY,
            "i": imdb_id,
            "type": "episode",
            "page": 1
        }

        # Set a flag to indicate whether all pages have been searched
        all_pages_searched = False

        # Set a list to store the results
        results = []

        # Search for episodes until all pages have been searched
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
                    print(data)
                    for item in data['Episodes']:
                        season = item['Season']
                        episode = item['Episode']
                        title = item['Title']
                        imdb_id = item['imdbID']
                        result = {
                        "season": season,
                        "episode": episode,
                        "title": title,
                        "imdb_id": imdb_id
                        }
                        results.append(result)

                    # Check if all pages have been searched
                    if data['totalResults'] == len(results):
                        all_pages_searched = True
                    else:
                        # Move to the next page
                        params["page"] += 1
            else:
                print("Request failed with status code: ", response.status_code)
                all_pages_searched = True

        return results


print(Episodes.get_episodes("tt1475582"))