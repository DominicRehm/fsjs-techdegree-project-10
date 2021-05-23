import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header';

const Forbidden = () => {
    return (
        <>
            <Header />
            <div className="default-container">
                <h2>Ups ... You're not authorized for this page!</h2>
                <Link className="button button-secondary" to="/">Return to list</Link>
            </div>
        </>
        
    );
};

export default Forbidden;