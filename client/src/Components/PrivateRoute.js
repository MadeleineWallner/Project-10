// High-order component for routes accessible to authenticated users only

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Consumer } from '../Context';


function PrivateRoute ({ component: Component, ...rest}) {

    return (
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props}/>
                    ) : (

// If the user tries to access a private route without being signed in: Redirect them to the sign in page 
                        <Redirect to={{
                            pathname: '/signin',
                            state: {from: props.location}
                        }}/>
                    )
                }
                    />
            )}
        </Consumer>
    )
}
export default PrivateRoute;