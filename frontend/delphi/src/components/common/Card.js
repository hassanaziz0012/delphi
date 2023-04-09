import React from 'react';
import '../../css/Card.css';

const Card = ({ children, className }) => {
    return (
        <div className={`card p-3 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
