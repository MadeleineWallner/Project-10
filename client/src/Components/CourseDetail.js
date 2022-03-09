/*
CourseDetail - This component provides the "Course Detail" screen 
by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 
The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route
 in order to delete a course. 
 This component also renders an "Update Course" button for navigating to the "Update Course" screen. 
*/

import React, {useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../Context';



const CourseDetail = () => {
    const { id } = useParams();
    const [ course, setCourse ] = useState([]);
    const [ user, setUser ] = useState([]);
    const context = useContext(Context);
    const history = useHistory();

// GET a course using the courses id 
    const getCourse = () => {
        context.data.getCourse(id)
        .then((response) => {
            setCourse(response);
            setUser(response.User);
        })
    };

// DELETE a course using the courses id. Redirect to the courses page.
    const deleteCourse = () => {
        context.data.deleteCourse(id)
            .then(() => console.log("deleted"))
            .then(history.push('/api/courses'))
        
    }

    useEffect(() => {
        getCourse();
    },[]);

    

// Return the course details + links to update or delete the course and one for returning to the list of all courses
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/api/courses/${id}/update`}>Update Course</a>
                    <a className="button" onClick={(deleteCourse)}>Delete Course</a>
                    <a className="button button-secondary" href="/api/courses">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main-flex">
                        <div>
                            <h3 className="course--detail-title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p> By {user.firstName} {user.lastName}</p>
                            <ReactMarkdown>
                                {course.description}
                            </ReactMarkdown>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown className="course--detail--list">
                                {course.materialsNeeded}
                            </ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;