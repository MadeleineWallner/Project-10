
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';

function UpdateCourse () {
    
    const history = useHistory();
    const context = useContext(Context);
    const { id } = useParams();
    const authenticatedUser = context.authenticatedUser;
    const userId = authenticatedUser.user.id;

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setestimatedTime ] = useState('');
    const [ materialsNeeded, setmaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState([]);

// GET the course using the course id
    useEffect(() => {
        function getCourse () {
            context.data.getCourse(id)    
            .then((response) => {
        // If the course doesn't exist - view the not found page    
                if(response === null){
                    history.push('/notfound');
        // If the authenticated user is not the owner of the course - view the forbidden page            
                } else if (userId !== response.User.id){
                    history.push('/forbidden');
        // Else - store the response in state              
                } else if (response !== null){
                    setTitle(response.title)
                    setDescription(response.description)
                    setestimatedTime(response.estimatedTime)
                    setmaterialsNeeded(response.materialsNeeded)
                  
                }                       
            })
        };
        getCourse();
    }, [context.data, id,  history, userId]);

    const change = (e) => {
        const value = e.target.value;
        switch(e.target.name){
          case "courseTitle":
              setTitle(value);
              break;
          case "courseDescription":
              setDescription(value);
              break;
          case "estimatedTime":
              setestimatedTime(value);
              break;
          case "materialsNeeded":
              setmaterialsNeeded(value);
              break;
              default: return;
    }
}

    const submit = (e) => {
        e.preventDefault();

        const emailAddress = authenticatedUser.user.emailAddress;
        const password = authenticatedUser.password;

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };



        context.data.updateCourse(course, id, emailAddress, password)
        .then(errors => {
            if(errors.length > 0){
                setErrors(errors)
            } else {
                history.push(`/courses/${id}`)
            }
        })
        .catch((err) => {
            console.log(err)
            history.push('/error/')
        });
        }

        function ViewErrors ({errors}) {
            let errorDisplay = null;
            if(errors.length){
                errorDisplay = (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                     </div>
                )
                
            }
            return errorDisplay;
            
        }

        function cancel(e) {
            e.preventDefault();
           history.push(`/courses/${id}`);
        };
   

    return(
        <div className="wrap">
            <h2>Update Course</h2>
            <ViewErrors errors={errors}/> 
            <form onSubmit={submit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={change}/>
                        <p>By {`${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`}</p>
                        <label htmlFor="courseDescription" name="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value={description} onChange={change}/>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change}/>
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button--secondary" onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateCourse;