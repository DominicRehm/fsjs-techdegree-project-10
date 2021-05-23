import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Cookies from 'js-cookie';

import Header from './Header';

const CreateCourse = () => {

    // Context
    const AppContext = useContext(Context);

    // History
    const history = useHistory();

    // State
    const [user, setUser] = useState({});
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState([]);

    // useEffect
    useEffect(() => {
        setUser(Cookies.getJSON('authUser') || null)
    }, []);

    // Functions
    const changeHandler = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        // Set State with input value
        switch (inputName) {
            case "courseTitle":
                setCourseTitle(inputValue);
                break;
            case "courseDescription":
                setCourseDescription(inputValue);
                break;
            case "estimatedTime":
                setEstimatedTime(inputValue);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(inputValue);
                break;
            default:
                break;
        };
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        history.push('/');
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Store the course data in the course object
        const course = {
            userId: user.userId,
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
        }

        // Create the new course
        AppContext.data.createCourse(course, user.emailAddress, Cookies.getJSON('authPassword'))
            .then( errors => {
                if (errors.length) {
                    setErrors([ errors ])
                } else {
                    history.push('/');
                };
            });
    };

    const errorList = errors.flat();

    return (
        <>
            <Header />
        <div className="wrap">
            <h2>Create Course</h2>
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
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input type="text" name="courseTitle" id="courseTitle" onChange={changeHandler}/>

                        <p>By Dominic Rehm</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea name="courseDescription" id="courseDescription" onChange={changeHandler}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" name="estimatedTime" id="estimatedTime" onChange={changeHandler}/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea name="materialsNeeded" id="materialsNeeded" placeholder="Each material in separate line ..." onChange={changeHandler}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
        </>
        
    );
};

export default CreateCourse;