import React from 'react';
import NavItem from './common/NavItem';
import { useCookies } from "react-cookie";
import { redirect, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';


const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const isLoggedIn = () => {
        const authToken = cookies["AUTH_TOKEN"];
        if (authToken) {
            return true
        } else {
            return false
        }
    }
 
    const getNavItems = () => {
        if (isLoggedIn()) {
            return (
                <div className="navbar-nav ml-auto">
                    <NavItem link="/library" text="Library" newTab={false} />
                    <NavItem link="/profile" text="Profile" newTab={false} />
                    <NavItem link="" text="Log Out" onClick={logoutUser} newTab={false} />
                </div>
            )
        } else {
            return (
                <div className="navbar-nav ml-auto">
                    <NavItem link="/signup" text="Sign Up" newTab={false} />
                    <NavItem link="/login" text="Log In" newTab={false} />
                </div>
            )
        }
    }

    const logoutUser = (e) => {
        e.preventDefault();
        removeCookie("AUTH_TOKEN");
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <img src="/logo.png" width="100" height="100" alt="Logo" />
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            {getNavItems()}
        </nav>
    );
};

export default Navbar;
