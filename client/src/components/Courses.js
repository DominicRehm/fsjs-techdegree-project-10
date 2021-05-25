import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

import Header from './Header'

const Courses = () => {

    // Context
    const AppContext = useContext(Context);

    // History
    const history = useHistory();

    // State
    const [courses, setCourses] = useState([]);

    // useEffect
    useEffect(() => {
        let isMounted = true;
        AppContext.data.api('/courses')
            .then(res => res.json())
            .then(data => {
                if (data.message === '500') {
                    // Error
                    history.push('/error');
                }
                if (isMounted) {
                    setCourses(data)
                }
            })
            .catch(error => {
                console.log(error);
                history.push('/error');
            })
    }, [AppContext.data, history]);

    return (
        <>
            <Header />
            <main>
                <div className="wrap main--grid">
                    {
                        courses ?
                        courses.map(course => 
                            <Link key={course.id} to={'/courses/' + course.id} className="course--module course--link">
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                        )
                        : null
                    } 
                    <Link to="/courses/create" className="course--module course--add--module">
                        <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                        </span>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default Courses;