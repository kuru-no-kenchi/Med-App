import React, { useState } from 'react';
import './Navbar.css'; // Importing the CSS file
import '../Data'
// import logo
import logoimg from '../assets/images/logo-hospital.png';
import { Link } from 'react-router-dom';
function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='container-fluid g-0'>
            <div className='container'>
                <nav className="navbar">
                    <div className="navbar-container">
                        {/* Logo */}
                        <div className="logo">
                            <img src={logoimg} alt="Hospital Logo" />
                        </div>

                        {/* Nav Links */}
                        <ul className={isOpen ? "nav-links active" : "nav-links"}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/About">About us</Link></li>
                            <li><Link to="/AllDoctors">All Doctors</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                        </ul>
                        {/* Create Account Button */}
                        <div className="create-account rounded-pill ">
                            <Link to="/Register" className="btn text-white fs-6">Create Account</Link>
                        </div>

                        {/* Toggle Button for Mobile */}
                        <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default Navbar;

