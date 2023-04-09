import jQuery from 'jquery';
import { Navigate } from 'react-router-dom';


const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const verifyLogin = () => {
    const authToken = getCookie("AUTH_TOKEN");
    if (!authToken) {
        console.log("User not logged in. Redirecting to login page...");
        return <Navigate to='/login' />
    }
}

export { getCookie, verifyLogin };