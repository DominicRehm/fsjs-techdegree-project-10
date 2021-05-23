import React, { createContext, useState } from 'react';
import Helper from './Helper';
import Cookies from 'js-cookie';

export const Context = createContext();

export const AppProvider = (props) => {

    const [authUser, setAuthUser] = useState();

    // Functions
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authUser');
        Cookies.remove('authPassword');
    }

    const value = {
        data: new Helper(),
        authUser,
        setAuthUser,
        signOut
    }

    return(
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}