import React, {useContext} from "react";
import { Context } from "../Context";

export default function Header() {

    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    // If there is no authenticated user - view the "sign in" and "sign up" buttons
    // If there is an authenticated user - view the users name and a "sign out" button

        return(
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <a href="/">Courses</a>
                    </h1>
                    <nav>
                    {authUser ? (
                        <React.Fragment>
                        <ul className="header--signedin">
                            <li>{authUser.user.firstName} {authUser.user.lastName}</li>
                            <li><a href="/signout/">Sign Out</a></li>
                        </ul>  
                        </React.Fragment>
                    ) : (
                        <ul className="header--signedout">
                            <li>
                                <a href="/signup">Sign Up</a>
                            </li>
                            <li>
                                <a href="/signin">Sign In</a>
                            </li>
                        </ul>
                    )}

                    </nav>

                </div>
            </header>
            
        )
}