import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';

const UserSignIn = () => {

        const [ emailAddress, setEmailAddress ] = useState('');
        const [ password, setPassword ] = useState('');
        const [ errors, setErrors ] = useState([]);
        const history = useHistory();
        const context = useContext(Context);


    const submit = (e) => {
        e.preventDefault();
        console.log(context)

        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if(user === null) {
                    setErrors(['Sign-in was unsuccesful']);
                } else {
                    history.goBack()
                }
            })
            .catch((error) => {
                console.error(error);
                
            })
    }
    

    //redirect the user to the courses page
    const cancel = (e) =>  {
        e.preventDefault();
        history.push('/api/courses')
      }


        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={submit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input id="pawssword" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={cancel}>Cancel</button>
                </form>
                    <p>Don't have a user account? Click here to 
                    <a href="/api/signup"> sign up</a>
                    !
                    </p>
                </div>
        )
    }

    
export default UserSignIn;