import React from 'react';
import '../../css/CircularImage.css';


const CircularImage = ({ url, alt }) => {
    return (
        <img src={url} alt={alt || "Profile Picture"} className="circular-image" />
    );
};

export default CircularImage;
