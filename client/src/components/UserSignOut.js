import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';

const SignOut = () => {

    // Context
    const AppContext = useContext(Context);

    // Execute Signout
    useEffect(() => AppContext.signOut());

    return (
        <Redirect to="/" />
    );
};

export default SignOut;