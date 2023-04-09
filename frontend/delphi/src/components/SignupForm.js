import React, { useState } from "react";
import axios from 'axios';
import TextInput from "./common/TextInput";
import Card from "./common/Card";
import DarkButton from "./common/DarkButton";
import { getCookie } from "../utils";
import "../css/SignupForm.css";


const SignupForm = () => {
    const signupEndpoint = "http://127.0.0.1:8000/signup/";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('')

    const onSubmitClick = (e) => {
        e.preventDefault();
        console.log("Submitting signup form");
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        const csrfToken = getCookie("csrftoken")

        axios.post(signupEndpoint, {
            username,
            email,
            password
        }, 
        {
            headers: {'X-CSRFToken': csrfToken}
        }
        )
            .then(response => {
                console.log(response);
                if (response.status === 201) {
                    console.log("Success."); // TODO: Need to redirect user to app dashboard later.
                }

            })
            .catch(error => {
                console.log(error);
                if (error.response.data.username[0]) {
                    setError(error.response.data.username[0]);
                }
            })
    }

    return (
        <div className="d-flex align-items-center justify-content-center signup-form-container">
            <Card className="w-50">
                <h3 className="text-center mb-4 font-weight-bold">Sign Up</h3>

                <form>
                    <TextInput placeholder="Username" required name="username" state={[username, setUsername]} />
                    <TextInput placeholder="Email" required name="email" state={[email, setEmail]} />
                    <TextInput placeholder="Password" type="password" required name="password" state={[password, setPassword]} />
                    <TextInput placeholder="Confirm Password" type="password" required name="confirm_password" state={[confirmPassword, setConfirmPassword]} />

                    {error && <p className="text-danger">{error}</p>}
                    <DarkButton text="Sign Up" type="submit" onClick={onSubmitClick} />
                </form>

            </Card>
        </div>
    );
};

export default SignupForm;