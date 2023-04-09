import React from 'react';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import { verifyLogin } from '../utils';


const ProfilePage = () => {

    return (
        <div>
            {verifyLogin()}
            <Navbar />
            <Profile />
            <Footer />
        </div>
    );
};

export default ProfilePage;
