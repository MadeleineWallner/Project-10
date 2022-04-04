import {React, useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';


// Sign out the user and redirect them to the courses page
const UserSignOut = () => {
    const context = useContext(Context);
    useEffect(() =>
        context.actions.signOut());

    return (
        <Redirect to="/" />
    );
}

export default UserSignOut;