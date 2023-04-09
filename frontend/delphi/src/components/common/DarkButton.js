import React from 'react';
import '../../css/DarkButton.css';


const DarkButton = ({ text, type, onClick, disabled, active }) => {
    return (
        <button className={`dark-button ${active && 'active'}`} onClick={onClick} disabled={disabled && disabled} type={type}>
            {text}
        </button>
    );
};

export default DarkButton;