import { useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import { Context } from "../Context";

function CreateCourse () {
   
    const history = useHistory();
    const context = useContext(Context);
    const authenticatedUser = context.authenticatedUser;
  


    //Function to redirect the user to the courses page
    function cancel(e) {
        e.preventDefault();
       history.push('/api/courses');
    };

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setestimatedTime ] = useState('');
    const [ materialsNeeded, setmaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const userId = authenticatedUser.user.id;

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
        };
    };

    const newCourse = (e) => {
        e.preventDefault();

        const emailAddress = authenticatedUser.user.emailAddress;
        const password = authenticatedUser.password


      const course = {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId
      };
  
      
      context.data.createCourse(course, emailAddress, password)
        .then(errors => {
            if(errors.length > 0){
                setErrors(errors)
                console.log(errors)
            } else {
                history.push('/api/courses')
            }
        })
        .catch((err) => {
            console.log(err)
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


    return(
        
        <div className="wrap">
            <h2>Create Course</h2>
            <ViewErrors errors={errors}/> 
            <form onSubmit={newCourse}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={change} />
                        <p>By {[`${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`]}</p>
                        <label htmlFor="courseDescription" name="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value={description} onChange={change}></textarea>                       
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change}/>
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={cancel}>Cancel</button> 
            </form>
        </div>
    );
};


export default CreateCourse;