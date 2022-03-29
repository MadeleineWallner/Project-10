// High-order component for routes accessible to authenticated users only

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Consumer } from './Context';

const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to='/api/signin' />
                    )
                }
                    />
            )}
        </Consumer>
    )
}
export default PrivateRoute;