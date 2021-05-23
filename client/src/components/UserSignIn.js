import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Cookies from 'js-cookie';

import Header from './Header';

const UserSignIn = () => {

    // State
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState();

    // Context
    const AppContext = useContext(Context);

    // History
    const history = useHistory();

    // Handle the input in the form
    const changeHandler = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        // Set State with input value
        switch (inputName) {
            case "emailAddress":
                setEmailAddress(inputValue);
                break;
            case "password":
                setPassword(inputValue);
                break;
            default:
                break;
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        AppContext.data.getUser(emailAddress, password)
            .then( user => {
                if (user === null) {
                    setErrors('Sign-In was unsuccessfully');
                } else {
                    // Set cookie
                    Cookies.set('authUser', JSON.stringify(user), { expires: 1 });
                    Cookies.set('authPassword', JSON.stringify(password), { expires: 1});
                    AppContext.setAuthUser(user);
                    history.push('/');
                };
            })
            .catch ( err => {
                console.log(err);
                history.push('/error');
            });
    };

    return (
        <>
            <Header />
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    {
                        errors ?
                            <div className="validation--errors">
                                <h3>Validation Errors</h3>
                                <ul>
                                    <li>{errors}</li>
                                </ul>
                            </div>
                        : null
                    }
                    <form onSubmit={submitHandler}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input type="email" name="emailAddress" id="emailAddress" onChange={changeHandler} />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={changeHandler} />

                        <button type="submit" className="button">Sign In</button>
                        <button className="button button-secondary">Cancel</button>
                    </form>

                    <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

                </div>
            </main>
        </>
    );
};

export default UserSignIn;