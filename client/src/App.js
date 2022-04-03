import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import Header from './Components/Header';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import PrivateRoute from './PrivateRoute';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError'





const App = () => {
  return(
<Router>
    <Header />
      <Switch>
          <Route exact path="/" component={Courses}/>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="/error" component={UnhandledError} />
          <Route component={NotFound} />
      </Switch>
  </Router>
  )
  
};

export default App;