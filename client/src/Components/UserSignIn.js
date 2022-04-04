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

  // Sign in the user if they exist in the database then send them back to the page they came from  
        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if(user === null) {
                    setErrors(['Incorrect email address or password']);
                } else {
                    history.goBack()
                }
            })
            .catch((error) => {
                console.error(error);
                history.push('/error')
            })
    }

     // Show validation errors (if there is any)    
     function ViewErrors ({errors}) {
        let errorDisplay = null;
        if(errors.length){
            errorDisplay = (
                <div className="validation--errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                 </div>
            )
            
        }
        return errorDisplay;
        
    }
    

        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <ViewErrors errors={errors}/> 
                <form onSubmit={submit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input id="pawssword" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={() => history.push('/')}>Cancel</button>
                </form>
                    <p>Don't have a user account? Click here to 
                    <a href="/signup"> sign up</a>
                    !
                    </p>
                </div>
        )
    }

    
export default UserSignIn;