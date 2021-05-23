import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header';

const UnhandledError = () => {
    return (
        <>
            <Header />
            <div className="default-container">
                <h2>Ups ... Something went wrong, sorry!</h2>
                <Link className="button button-secondary" to="/">Return to list</Link>
            </div>
        </>
        
    );
};

export default UnhandledError;