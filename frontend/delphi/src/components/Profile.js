import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import Card from './common/Card';
import TextInput from './common/TextInput';
import DarkButton from './common/DarkButton';
import CircularImageInput from './common/CircularImageInput';
import '../css/Profile.css';
import { getCookie } from '../utils';


const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const [profilePicture, setProfilePicture] = useState('/logo.png');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('')

    const getInitialProfile = () => {
        const authToken = cookies["AUTH_TOKEN"];
        const url = "http://127.0.0.1:8000/profile"
        axios.get(url, {
            headers: {
                "Authorization": `Token ${authToken}`
            }
        })
            .then(response => {
                setUsername(response.data.username);
                setEmail(response.data.email);
                setProfilePicture("http://127.0.0.1:8000" + response.data.picture);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getInitialProfile();
    }, [])

    const saveChanges = () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match.")
            return;
        }

        const authToken = cookies["AUTH_TOKEN"];
        const url = "http://127.0.0.1:8000/profile/";
        axios.put(url, {
            "username": username,
            "email": email,
            "password": password,
            "picture": profilePicture.split(',')[1]
        }, 
        {
            headers: {
                "Authorization": `Token ${authToken}`,
                "X-CSRFToken": getCookie("csrftoken"),
            }
        })
            .then(response => {
                console.log(response.data);
            })
    }
    

    return (
        <div className='profile d-flex align-items-center'>
            <Card className="w-50 m-auto">
                <h1 className="text-center font-weight-bold">Profile</h1>
                <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className='profile-picture-container mr-4'>
                        <CircularImageInput url={profilePicture} state={[profilePicture, setProfilePicture]} />
                    </div>

                    <div className='flex-grow-1'>
                        <TextInput placeholder="Username" value={username} state={[username, setUsername]} />
                        <TextInput placeholder="Email" value={email} state={[email, setEmail]} />
                    </div>
                </div>


                <div className='security-section mt-4'>
                    <h4 className='text-left ml-2'>Security</h4>
                    <div className="d-flex align-items-center mt-3">
                        <div className='w-100'>
                            <TextInput type="password" placeholder="Password" value={password} state={[password, setPassword]} />
                        </div>
                        <div className='w-100'>
                            <TextInput type="password" placeholder="Confirm Password" value={confirmPassword} state={[confirmPassword, setConfirmPassword]} />
                        </div>
                    </div>
                </div>

                <hr className="w-75 mx-auto" />
                {error && <p className="text-danger">{error}</p>}
                <DarkButton text="Save Changes" onClick={saveChanges} />
            </Card>
        </div>
    )
};

export default Profile;
