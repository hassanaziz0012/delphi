import React, { useState } from 'react';
import '../../css/ButtonNav.css';
import DarkButton from './DarkButton';


const ButtonNav = ({ buttons, onClick }) => {
    const [activeButton, setActiveButton] = useState(buttons[0]);

    const handleClick = (e) => {
        setActiveButton(e.target.textContent);
        onClick(e.target.textContent);
    };

    return (
        <div className="button-nav">
            {buttons.map((button) => (
                <DarkButton
                    key={button}
                    text={button}
                    onClick={handleClick}
                    active={activeButton === button}
                />
            ))}
        </div>
    );
};

export default ButtonNav;
