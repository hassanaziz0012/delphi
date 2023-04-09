import React, { useState } from "react";
import '../../css/SelectInput.css';


const SelectInput = ({ options, state }) => {
    const [selectedOption, setSelectedOption] = state;

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="select-input">
            <select value={selectedOption} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInput;
