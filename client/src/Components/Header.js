import React from "react";

export default class Header extends React.PureComponent {
    render(){
        return(
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <a href="/api/courses">Courses</a>
                    </h1>
                    <nav>
                        <ul className="header--signedout">
                            <li>
                                <a href="/api/signup">Sign Up</a>
                            </li>
                            <li>
                                <a href="/api/signin">Sign In</a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </header>
            
        )
    }
}