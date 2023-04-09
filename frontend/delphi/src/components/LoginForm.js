import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import TextInput from "./common/TextInput";
import Card from "./common/Card";
import DarkButton from "./common/DarkButton";
import { getCookie } from "../utils";
import "../css/LoginForm.css";
import { Navigate, useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')

    const onSubmitClick = (e) => {
        e.preventDefault();

        const csrfToken = getCookie("csrftoken")
        
        const url = "http://127.0.0.1:8000/login/";
        axios.post(url, {
            username,
            password
        }, 
        {
            headers: {'X-CSRFToken': csrfToken}
        }
        )
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    const authToken = response.data.token;
                    setCookie("AUTH_TOKEN", authToken);
                    navigate('/profile');
                }

            })
            .catch(error => {
                console.log(error);
                if (error.response.data.error) {
                    setError(error.response.data.error);
                }
            })
    }

    return (
        <div className="d-flex align-items-center justify-content-center signup-form-container">
            <Card className="w-50">
                <h3 className="text-center mb-4 font-weight-bold">Log In</h3>

                <form>
                    <TextInput placeholder="Username" required name="username" state={[username, setUsername]} />
                    <TextInput placeholder="Password" type="password" required name="password" state={[password, setPassword]} />

                    {error && <p className="text-danger">{error}</p>}
                    <DarkButton text="Login" type="submit" onClick={onSubmitClick} />
                </form>

            </Card>
        </div>
    );
};

export default LoginForm;