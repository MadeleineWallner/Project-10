import React, {Component, createContext} from 'react';
import CreateCourse from './Components/CreateCourse';
import Data from './Data';

export const Context = createContext();

export class Provider extends Component {

// New instance of the Data class    
    data = new Data();
    
    render(){

        const value = {
            data: this.data,
            actions: {
                getCourses: this.getCourses,
                getCourse: this.getCourse,
                cancel: this.cancel,
                signUp: this.signUp,
                createCourse: this.createCourse
            }
        }

        return(
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
        
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