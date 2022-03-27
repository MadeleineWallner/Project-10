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




export default () => (
  <Router>
    <Header />
      <Switch>
          <Route exact path="/api/courses" component={Courses}/>
          <Route exact path="/api/courses/:id" component={CourseDetail} />
          <Route path="/api/signin" component={UserSignIn} />
          <Route path="/api/signup" component={UserSignUp} />
          <Route path="/api/signout" component={UserSignOut} />
          <Route path="/api/create" component={CreateCourse} />
          <Route path="/api/courses/:id/update" component={UpdateCourse} />
      </Switch>
  </Router>
);

