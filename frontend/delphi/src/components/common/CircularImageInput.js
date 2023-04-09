import React from 'react';
import CircularImage from './CircularImage';
import '../../css/CircularImageInput.css';


const CircularImageInput = ({ url, state }) => {
    const [image, setImage] = state;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="circular-image-input">
            <CircularImage url={image} />
            <label htmlFor="file-input">
                <i className="fa fa-upload"></i>
            </label>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
    );
}

export default CircularImageInput;