import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header';

const NotFound = () => {
    return (
        <>
            <Header />
            <div className="default-container">
                <h2>Ups ... It doesn't go any further here!</h2>
                <Link className="button button-secondary" to="/">Return to list</Link>
            </div>
        </>
        
    );
};

export default NotFound;