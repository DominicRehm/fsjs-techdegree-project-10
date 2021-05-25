import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Cookies from 'js-cookie';

import Header from './Header';

const UserSignUp = () => {

    // State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // Context
    const AppContext = useContext(Context);

    // History
    const history = useHistory();

    // Functions
    const submitHandler = (e) => {
        e.preventDefault();

        // Store the course data in the course object
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        AppContext.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    setErrors([ errors ])
                } else {
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
            })
            .catch ( err => {
                console.log(err);
                history.push('/error');
            });
    };

    const changeHandler = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        // Set State with input value
        switch (inputName) {
            case "firstName":
                setFirstName(inputValue);
                break;
            case "lastName":
                setLastName(inputValue);
                break;
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

    const errorList = errors.flat();

    return (
        <>
            <Header />
            <div className="form--centered">
                <h2>Sign Up</h2>
                {
                    errorList.length > 0 ?
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {
                                    errorList.map((error, index) =>
                                        <li key={index}>{error}</li>
                                    )
                                }
                            </ul>
                        </div>
                        : null
                }
                <form onSubmit={submitHandler}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" onChange={changeHandler} />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName"  onChange={changeHandler} />

                    <label htmlFor="emailAddress">Email Address</label>
                    <input type="email" name="emailAddress" id="emailAddress" onChange={changeHandler} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={changeHandler} />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />

                    <button type="submit" className="button">Sign Up</button>
                    <button className="button button-secondary">Cancel</button>
                </form>

                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>

            </div>
        </>
    );
};

export default UserSignUp;