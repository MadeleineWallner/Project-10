/*
CourseDetail - This component provides the "Course Detail" screen 
by retrieving the detail for a course from the REST API's /courses/:id route and rendering the course. 
The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /courses/:id route
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
    const authenticatedUser = context.authenticatedUser;

// GET a course using the courses id and store the response in course and user. If the course id doesn't exist view the not found page.
    useEffect(() => {
        const getCourse = () => {
            context.data.getCourse(id)
            .then((response) => {
                if(response === null){
                    history.push('/notfound')
                } else {
                    setCourse(response);
                    setUser(response.User);
                }
            })
            .catch((error) => {
                console.error(error);
                history.push('/error/')
            })
        };
        getCourse();
    }, [context.data, id, history]);

// DELETE a course using the courses id. Redirect to the courses page.
const deleteCourse = () => {
    context.data.deleteCourse(id)
        .then(() => console.log("deleted"))
        .then(history.push('/'))
        .catch((error) => {
            console.log(error);
            history.push('/error/')
        })

}

//View the 'Update Course' and 'Delete Course' buttons only if there is an authenticated user AND that user's id is the same as the owner of the course
    const AuthUser = () => {
        let buttons = null;
        if(authenticatedUser && authenticatedUser.user.id === user.id){
            buttons = (
                <>
                <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                <a className="button" href="# " onClick={(deleteCourse)}>Delete Course</a>
                </>

                
            )
        }
        return buttons;
    }

    

// Return the course details + links to update or delete the course and one for returning to the list of all courses
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <AuthUser/>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
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