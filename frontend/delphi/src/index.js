import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import MoviePage from './pages/MoviePage';
import ShowPage from './pages/ShowPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <ProfilePage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    {
        path: "/library",
        element: <LibraryPage />
    },
    {
        path: "/movie/:imdbId",
        loader: ({ params }) => {
            return params.imdbId;
        },
        element: <MoviePage />
    },
    {
        path: "/show/:imdbId",
        loader: ({ params }) => {
            return params.imdbId;
        },
        element: <ShowPage />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <RouterProvider router={router} />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
