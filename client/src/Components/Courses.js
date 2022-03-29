
import React, {useEffect, useState, useContext} from 'react';
import { Context } from '../Context';
import {useHistory} from 'react-router-dom'



const Courses = () => {
    const history = useHistory();
    const [coursesList, setCoursesList] = useState([]);
    const context = useContext(Context);

// Retrieve all courses from the REST API and store the response in coursesList
    useEffect(() => {
        const getCourses = () => {
            context.data.getCourses()
            .then((response) => {
                if(response )
                setCoursesList(response)
            })
            .catch((error) => {
                console.error(error);
                history.push('/api/error/')
            })
        };
        getCourses();
    }, [context.data, history]);


// return all courses + link to "new course"
        return (
        <main>
            <div className="wrap main--grid">
                {coursesList.map((course) =>
                    <a className="course--module course--link" href={`/api/courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                )}
                    <a className="course--module course--add--module" href="/api/courses/create">
                    <span className="course--add--title">  
                        <svg className="add" version= "1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </span>
                    </a>
            </div>
        </main>
    )
}

export default Courses