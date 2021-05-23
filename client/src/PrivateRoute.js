import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => (
                Cookies.getJSON('authUser') ?
                    <Component {...props} />
                : <Redirect to="/signin" />
            )}
        />
    );
};