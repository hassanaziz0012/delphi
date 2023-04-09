import React, { useState } from "react";
import '../../css/TextInput.css';



const TextInput = ({ placeholder, name, type, required, state, min, max, step }) => {
    const [value, setValue] = state;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={`text-input-container ${isFocused ? "focused" : ""}`}>
            <label
                className={`text-input-label ${value || isFocused ? "text-input-label-focused" : ""
                    }`}
            >
                {placeholder}
            </label>
            <input
                className="text-input"
                type={type || "text"}
                value={value}
                name={name}
                onChange={(e) => setValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required={required}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
};

export default TextInput;
