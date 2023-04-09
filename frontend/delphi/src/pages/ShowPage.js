import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowDetails from '../components/ShowDetails';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const ShowPage = () => {
    const [show, setShow] = useState(null);
    const imdbId = useLoaderData();
    console.log(imdbId);

    useEffect(() => {
        const getShow = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/shows/${imdbId}`);
            setShow(response.data);
        };
        getShow();
    }, [imdbId]);

    return (
        <div>
            <Navbar />
            {show ? <ShowDetails show={show} /> : <p>Loading...</p>}
            <Footer />
        </div>
    );
};

export default ShowPage;
