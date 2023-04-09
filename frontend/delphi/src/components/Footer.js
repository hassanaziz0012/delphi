import React from 'react';
import NavItem from './common/NavItem';
import '../css/Footer.css';


const Footer = () => {
    const portfolioUrl = "https://hassanaziz0012.github.io/portfolio-website"
    const githubUrl = "https://github.com/hassanaziz0012/deplhi"

    return (
        <footer className="footer">
            <div className="footer-text">
                Delphi - A React and Django app built for tracking your favorite movies and TV shows
            </div>
            <hr className="footer-line" />
            <div className="footer-text">
                Made by <a href={portfolioUrl}>Hassan Aziz</a>
            </div>
            <NavItem link={githubUrl} text="See Github" newTab={true} />
        </footer>
    );
}

export default Footer;
