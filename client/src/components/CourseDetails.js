import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Cookies from 'js-cookie';

import Header from './Header';

const CourseDetail = () => {

    let { id } = useParams();

    // State
    const [courseUser, setCourseUser] = useState({});
    const [course, setCourse] = useState({});
    const [description, setDescription] = useState();
    const [materialsNeeded, setMaterialsNeeded] = useState();

    // Context
    const AppContext = useContext(Context);

    // History
    const history = useHistory();

    // Handler for deleting the course
    const deleteHandler = () => {
        const emailAddress = Cookies.getJSON('authUser').emailAddress;
        const password = Cookies.getJSON('authPassword')
        history.push('/confirm')
        AppContext.data.deleteCourse(id, emailAddress, password);
    };

    // Edit the description for a better look inside the course details
    const editDescription = (description) => {
        const descriptionList = description.split('\n\n');
        const formattedDesc = descriptionList.map((desc, index) =>
            <p key={index}>{desc}</p>
        );
        setDescription(formattedDesc);
    };

    // Edit the materials needed for a better look inside the course details
    const editMaterials = (materials) => {
        if (materials) {
            const materialsArray = materials.split('\n');
            const materialsList = materialsArray.map((material, index) =>
                <li key={index}>{material}</li>
            );
            setMaterialsNeeded(materialsList);
        } else {
            setMaterialsNeeded(<p>You need no materials for this course!</p>);
        };
    };

    // useEffect
    useEffect(() => {
        let isMounted = true;
        AppContext.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.message === "500") {
                    // Error
                    history.push('/error')
                }
                if (isMounted) {
                    setCourseUser(data.User);
                    setCourse(data);
                    editDescription(data.description);
                    editMaterials(data.materialsNeeded);
                };
            });
    }, [AppContext.data, id, history]);

    return (
        <>
            <Header />
            <main>
                <div className="actions--bar">
                    <div className="wrap">


                        {
                            Cookies.getJSON('authUser') !== undefined ?
                                courseUser.emailAddress === Cookies.getJSON('authUser').emailAddress ?
                                    <>
                                        <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                                        <Link className="button" to="#" onClick={deleteHandler}>Delete Course</Link>
                                        <Link to="/" className="button button-secondary">Return to List</Link>
                                    </>
                                    :
                                    <Link to="/" className="button button-secondary">Return to List</Link>
                                :
                                <Link to="/" className="button button-secondary">Return to List</Link>
                        }
                    </div>
                </div> 
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                {description}
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {materialsNeeded}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>

    );
};

export default CourseDetail;