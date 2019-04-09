import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './googleAuth';
import '../assets/styles/styles.css';

const Header = () => {
    return (
        <div className="ui block red header pointing menu" id="menu">
            <Link to="/" className="item">
                Streamy
            </Link>
            <div className="right menu">
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;