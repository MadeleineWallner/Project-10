import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from '../Context';

function UserSignUp () {

    const history = useHistory();
    const context = useContext(Context);

      const [ firstName, setfirstName ] = useState('');
      const [ lastName, setlastName ] = useState('');
      const [ emailAddress, setemailAddress ] = useState('');
      const [ password, setPassword ] = useState('');
      const [ errors, setErrors ] = useState([]);


      // Set the fields value to what the user types in
      const change = (e) => {
          const value = e.target.value;
          switch(e.target.name){
            case "firstName":
                setfirstName(value);
                break;
            case "lastName":
                setlastName(value);
                break;
            case "emailAddress":
                setemailAddress(value);
                break;
            case "password":
                setPassword(value);
                break;
                default: return;
          }
      }

      const signUp = (e) => {
            e.preventDefault();

          const user = {
              firstName,
              lastName,
              emailAddress,
              password,
          };

          context.data.signUp(user)
              .then(errors => {
                if(errors.length){
                    setErrors(errors)
                } else {
                    console.log("kuk");
                }
              })
              .catch((err) => {
                  console.log(err);
              });
      };

    //Function to redirect the user to the courses page
        function cancel(e) {
            e.preventDefault();
           history.push('/api/courses');
        };



    return(
        
        <div className="form--centered">
            <h2>Sign Up</h2>
            <form onSubmit={(e) => signUp(e)}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={change} ></input>
                <label htmlFor="lastName" onChange={change} >Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={change} ></input>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={change} ></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={change} ></input>
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default UserSignUp