import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };

// New instance of the Data class 
    constructor(props){
        super(props);
        this.data = new Data();
    }

    
    render(){
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut 
            },
        };

        return(
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
        
    }

    //Sign in the user and store the user data in a cookie
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user !== null){
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
        }
        return user;
    }

    //Sign out the user and remove the authenticateduser cookie
    signOut = () => {
        this.setState({authenticatedUser: null});
        Cookies.remove('authenticatedUser');
    }
    

}

export const Consumer = Context.Consumer;

export default function withContext(Component){
    return function ContextComponent(props){
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}