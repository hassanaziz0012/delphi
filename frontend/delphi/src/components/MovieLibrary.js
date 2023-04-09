import React, { useEffect, useState } from 'react';
import TextInput from './common/TextInput';
import DarkButton from './common/DarkButton';
import MovieCard from './MovieCard';
import axios from 'axios';
import { getCookie } from '../utils';


const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

function MovieLibrary() {
    const [searchText, setSearchText] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearchClick = () => {
        // Perform search using axios here
        const url = "http://127.0.0.1:8000/movies/search/"
        axios.get(url, {
            params: {
                q: searchText
            }
        }
        )
            .then(response => {
                console.log(response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const getInitialMovies = async () => {
        const authToken = getCookie("AUTH_TOKEN");
        let url = "http://127.0.0.1:8000/profile/"

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Token ${authToken}`
            }
        });


        const movieIds = response.data.movies;
        movieIds.forEach(async (imdbId) => {
            url = `http://127.0.0.1:8000/movies/${imdbId}/`;
            const movieResponse = await axios.get(url, {
                headers: {
                    "Authorization": `Token ${authToken}`
                }
            });
            setMovies(prevMovies => {
                if (prevMovies.length === 0) {
                    return [movieResponse.data]
                } else {
                    return [...prevMovies, movieResponse.data]
                }
            });
            console.log(imdbId, movies);

        });
        console.log("Updating movies state...");

    }

    useEffect(() => {
        getInitialMovies();
    }, []);

    return (
        <div className='container mt-4'>
            {
                movies ? (
                    <div>
                        <TextInput placeholder="Search Movies" name="Search Movies" state={[searchText, setSearchText]} required />
                        <DarkButton text="Search" onClick={handleSearchClick} />
                        {
                            movies.length > 0 ? (
                                <div className='row'>
                                    {
                                        movies.map((card, key) => (
                                            <div key={card.imdb_id} className='col-md-4'>
                                                <MovieCard 
                                                    key={card.imdb_id} 
                                                    title={card.title} 
                                                    category={card.user_category}
                                                    rating={card.user_rating}
                                                    imageUrl={card.poster_url} 
                                                    imdbId={card.imdb_id} 
                                                    addedToLibrary={true} 
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <h2>No movies found</h2>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <h2>You don't have any movies added. Add some here...</h2>
                        <TextInput placeholder="Search Movies" name="Search Movies" state={[searchText, setSearchText]} required />
                        <DarkButton text="Search" onClick={handleSearchClick} />
                    </div>
                )
            }
        </div>
    );
}

export default MovieLibrary;
