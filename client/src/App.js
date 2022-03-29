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
import Error from './Components/Error'





const App = () => {
  return(
<Router>
    <Header />
      <Switch>
          <Route exact path="/api/courses" component={Courses}/>
          <PrivateRoute path="/api/courses/:id/update" component={UpdateCourse} />
          <PrivateRoute path="/api/courses/create" component={CreateCourse} />
          <Route path="/api/courses/:id" component={CourseDetail} />
          <Route path="/api/signin" component={UserSignIn} />
          <Route path="/api/signup" component={UserSignUp} />
          <Route path="/api/signout" component={UserSignOut} />
          <Route path="/api/notfound" component={NotFound} />
          <Route path="/api/forbidden" component={Forbidden} />
          <Route path="/api/error" component={Error} />
          <Route component={NotFound} />
      </Switch>
  </Router>
  )
  
};

export default App;