import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Cookies from 'js-cookie';

import Header from './Header';

const UpdateCourse = () => {

    // Get the course ID
    let { id } = useParams();

    // History
    const history = useHistory();

    // State
    const [courseTitle, setCourseTitle] = useState("");
    const [courseAuthor, setCourseAuthor] = useState({});
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState();


    // Context
    const AppContext = useContext(Context);

    const submitHandler = (e) => {
        e.preventDefault();

        // Store the course data in the course object
        const course = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
        }

        // API - Update the course
        AppContext.data.updateCourse(id, course, Cookies.getJSON('authUser').emailAddress, Cookies.getJSON('authPassword'))
            .then(errors => {
                if (errors.length) {
                    // If there're any errors -> Save these in the errors state
                    setErrors(errors);
                } else {
                    // else -> push to the root route
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
                history.push('/error')
            });
    };

    // Handle the cancel button
    const cancelHandler = (e) => {
        e.preventDefault();
        history.push(`/courses/${id}`);
    };

    // Handle the input in the form
    const changeHandler = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        switch (inputName) {
            case "courseTitle":
                setCourseTitle(inputValue)
            break;
            case "courseDescription":
                setCourseDescription(inputValue)
                break;
            case "estimatedTime":
                setEstimatedTime(inputValue)
                break;
            case "materialsNeeded":
                setMaterialsNeeded(inputValue)
                break;
            default:
                break;
        }
    };

    // Get the Course Details
    useEffect(() => {
        let isMounted = true;
        AppContext.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.mesage === "500") {
                    // Error
                    console.log('There is an error')
                }
                if (isMounted) {
                    setCourseTitle(data.title);
                    setCourseDescription(data.description);
                    setEstimatedTime(data.estimatedTime);
                    setMaterialsNeeded(data.materialsNeeded);
                    setCourseAuthor(data.User);
                }
            })
    }, [AppContext.data, id]);

    return (
        <>
            <Header />
                <div className="wrap">
                    <main>
                        <h2>Update Course</h2>
                        {
                            errors ?
                                <div className="validation--errors">
                                    <h3>Validation Errors</h3>
                                    <ul>
                                        {
                                            errors.map((error, index) => 
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
                                        <input type="text" name="courseTitle" id="courseTitle" value={courseTitle} onChange={changeHandler}/>

                                        <p>By {`${courseAuthor.firstName} ${courseAuthor.lastName}`}</p>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea name="courseDescription" id="courseDescription" value={courseDescription} onChange={changeHandler}></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input type="text" name="estimatedTime" id="estimatedTime" value={estimatedTime} onChange={changeHandler}/>

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea name="materialsNeeded" id="materialsNeeded" value={materialsNeeded} onChange={changeHandler}></textarea>
                                    </div>
                                </div>
                                <button className="button" type="submit">Update Course</button>
                                <button className="button button-secondary" onClick={cancelHandler}>Cancel</button>
                            </form>
                    </main>
                </div>
        </>
    );
};

export default UpdateCourse;