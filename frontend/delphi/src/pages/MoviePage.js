import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from '../components/MovieDetails';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const MoviePage = () => {
    const [movie, setMovie] = useState(null);
    const imdbId = useLoaderData();
    console.log(imdbId);

    useEffect(() => {
        const getMovie = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/movies/${imdbId}`);
            setMovie(response.data);
        };
        getMovie();
    }, [imdbId]);

    return (
        <div>
            <Navbar />
            {movie ? <MovieDetails movie={movie} /> : <p>Loading...</p>}
            <Footer />
        </div>
    );
};

export default MoviePage;
