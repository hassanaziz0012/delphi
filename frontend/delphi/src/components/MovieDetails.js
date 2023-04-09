import React, { useEffect, useState } from 'react';
import DarkButton from './common/DarkButton';
import '../css/MovieDetails.css';
import SelectInput from './common/SelectInput';
import TextInput from './common/TextInput';
import axios from 'axios';
import { getCookie } from '../utils';


const MovieDetails = ({ movie }) => {
    const { title, director, year, runtime, genre, plot, awards, imdb_rating } = movie;
    const [showFullPlot, setShowFullPlot] = useState(false);
    const toggleFullPlot = () => setShowFullPlot(!showFullPlot);
    const plotToShow = showFullPlot ? plot : plot.substring(0, 500);
    const showMoreLink = !showFullPlot ? <a className='show-more-link' onClick={toggleFullPlot}>Show more</a> : null;

    const libraryOptions = [
        {"value": "WATCHING", "name": "Watching"},
        {"value": "PLAN_TO_WATCH", "name": "Planning to watch"},
        {"value": "WATCHED", "name": "Watched"},
    ]

    const [userRating, setUserRating] = useState(5.0);
    const [userCategory, setUserCategory] = useState("PLAN_TO_WATCH");
    const [successMsg, setSuccessMsg] = useState(null);
    const [showRemoveBtn, setShowRemoveBtn] = useState(false);
    const [removed, setRemoved] = useState(false);

    const getImageUrl = () => {
        return movie.poster_url !== "N/A" ? movie.poster_url : "/default-movie-poster.png"
    }

    const alreadyExists = () => {
        const url = "http://127.0.0.1:8000/profile/"
        const authToken = getCookie("AUTH_TOKEN");
        console.log("Checking if movie already exists in library.");

        axios.get(url, {
            headers: {
                "Authorization": `Token ${authToken}`
            }
        }).then(response => {
            if (response.data.movies.includes(movie.imdb_id)) {
                setSuccessMsg(true);
                setShowRemoveBtn(true);
            }
            else {
                setSuccessMsg(false);
                setShowRemoveBtn(false);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const removeFromLibrary = (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/profile/movies/remove/";
        const authToken = getCookie("AUTH_TOKEN");

        axios.delete(url, 
            {
            headers: {
                "Authorization": `Token ${authToken}`
            },
            data: {
                "imdb_id": movie.imdb_id
            }, 

        }).then(response => {
            setShowRemoveBtn(false);
            setRemoved(true);
        }).catch(error => {
            console.log(error);
        })
    }

    const addToLibrary = (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/profile/movies/add/"
        const authToken = getCookie("AUTH_TOKEN");

        axios.post(url, {
            imdb_id: movie.imdb_id,
            category: userCategory,
            rating: userRating
        }, {
            headers: {
                "Authorization": `Token ${authToken}`
            }
        })
        .then(response => {
            if (response.status === 201) {
                setSuccessMsg("Added to library.")
                setShowRemoveBtn(true);
                setRemoved(false);
            }
        })
        .catch(error => {
            console.log(error)
        })

    }

    useEffect(() => {
        alreadyExists();
    }, [showRemoveBtn]);

    return (
        <div className="movie-details container">
            <div className="left-section">
                <img src={getImageUrl(movie.poster_path)} alt={title} />
                <form onSubmit={addToLibrary}>
                    <SelectInput options={libraryOptions} state={[userCategory, setUserCategory]} />

                    <div className='user-rating d-flex align-items-center'>
                        <h5>Your Rating</h5>
                        <TextInput type={"number"} value={userRating} state={[userRating, setUserRating]} min={"0.0"} max={"5.0"} step={"0.1"} />
                    </div>

                    <DarkButton text={successMsg === false ? "Add to Library" : "Added"} disabled={successMsg && true} />
                    {showRemoveBtn && <a className='remove-from-library-link' onClick={removeFromLibrary}>Remove from library</a>}
                    {removed && <p>Removed.</p>}
                </form>
            </div>

            <div className="right-section">
                <h1>{title}</h1>
                
                <div className='metadata d-flex align-items-center'>
                    <h5>{director}</h5>
                    <h5>{year}</h5>
                    <h5>{runtime}</h5>
                </div>
                <h5>{genre}</h5>

                <p>{plotToShow}</p>
                {showMoreLink}
                <hr />
                <h4>Awards</h4>
                <p>{awards}</p>
                <h5>IMDB rating</h5>

                <div className='d-flex align-items-baseline'>
                    <i className='fa fa-star fa-lg mr-1' />
                    <h5>{imdb_rating}/10</h5>
                </div>

                <a className='imdb-link' href={`https://www.imdb.com/title/${movie.imdb_id}/`} target="_blank" rel='noreferrer'>
                    See on IMDB
                </a>
            </div>

        </div>
    );
};

export default MovieDetails;