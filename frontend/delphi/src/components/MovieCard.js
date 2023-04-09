import React from 'react';
import DarkButton from './common/DarkButton';
import '../css/MovieCard.css';
import { useNavigate } from 'react-router-dom';


const MovieCard = ({ imageUrl, title, category, rating, imdbId, addedToLibrary }) => {
    const navigate = useNavigate();

    const getImageUrl = () => {
        console.log(imageUrl);
        return imageUrl !== "N/A" ? imageUrl : "/default-movie-poster.png"
    }

    return (
        <div className="movie-card">
            <img src={getImageUrl()} alt={title} />
            <div className="overlay">
                <DarkButton text="See Details" onClick={() => navigate(`/movie/${imdbId}`)} />
                {addedToLibrary === true ? null : <DarkButton text="Add to Library" />}
            </div>
            <h4>{title}</h4>
            {
                category && rating !== null ?
                <div className='d-flex align-items-center user-info'>
                    <p className='category'>{category}</p>

                    <div className='d-flex align-items-baseline rating'>
                        <i className='fa fa-star fa-lg mr-1' />
                        <p>{rating}/5</p>
                    </div>
                </div>
                :
                null
            }
        </div>

    );
};

export default MovieCard;
