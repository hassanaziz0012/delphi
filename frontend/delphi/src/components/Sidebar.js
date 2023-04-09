import React from 'react';
import '../css/Sidebar.css';
import NavItem from './common/NavItem';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Library</h2>
            <hr />
            <NavItem link="/movies" newTab={false} text="Browse Movies" />
            <NavItem link="/shows" newTab={false} text="Browse Shows" />
            <hr />
            <NavItem link="/movies" newTab={false} text="My Movies" />
            <NavItem link="/shows" newTab={false} text="My Shows" />
        </div>
    );
};

export default Sidebar;
