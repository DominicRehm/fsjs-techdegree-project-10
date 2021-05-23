import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const Confirm = () => {
    return (
        <>
            <Header />
            <div className="default-container">
                <h2>Course successfully deleted!</h2>
                <Link className="button button-secondary" to="/">Return to list</Link>
            </div>
        </>
    );
};

export default Confirm;