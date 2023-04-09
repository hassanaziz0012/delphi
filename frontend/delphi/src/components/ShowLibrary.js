import React, { useEffect, useState } from 'react';
import TextInput from './common/TextInput';
import DarkButton from './common/DarkButton';
import ShowCard from './ShowCard';
import axios from 'axios';
import { getCookie } from '../utils';


function ShowLibrary() {
    const [searchText, setSearchText] = useState('');
    const [shows, setShows] = useState([]);

    const handleSearchClick = () => {
        // Perform search using axios here
        const url = "http://127.0.0.1:8000/shows/search/"
        axios.get(url, {
            params: {
                q: searchText
            }
        }
        )
            .then(response => {
                console.log(response.data);
                setShows(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const getInitialShows = async () => {
        const authToken = getCookie("AUTH_TOKEN");
        let url = "http://127.0.0.1:8000/profile/"

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Token ${authToken}`
            }
        });


        const showIds = response.data.shows;
        showIds.forEach(async (imdbId) => {
            url = `http://127.0.0.1:8000/shows/${imdbId}/`;
            const showResponse = await axios.get(url, {
                headers: {
                    "Authorization": `Token ${authToken}`
                }
            });
            setShows(prevShows => [...prevShows, showResponse.data]);
            console.log(imdbId, shows);

        });
    }

    useEffect(() => {
        getInitialShows();
    }, []);

    return (
        <div className='container mt-4'>
            {
                shows ? (
                    <div>
                        <TextInput placeholder="Search Shows" name="Search Shows" state={[searchText, setSearchText]} required />
                        <DarkButton text="Search" onClick={handleSearchClick} />
                        {
                            shows.length > 0 ? (
                                <div className='row'>
                                    {
                                        shows.map((card, key) => (
                                            <div key={card.imdb_id} className='col-md-4'>
                                                <ShowCard 
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
                                <h2>No shows found</h2>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <h2>You don't have any shows added. Add some here...</h2>
                        <TextInput placeholder="Search Shows" name="Search Shows" state={[searchText, setSearchText]} required />
                        <DarkButton text="Search" onClick={handleSearchClick} />
                    </div>
                )
            }
        </div>
    );
}

export default ShowLibrary;
