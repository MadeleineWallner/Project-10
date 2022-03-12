import React from 'react';
import Context from './Context';




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

//Connects the Courses component to context
const CoursesWithContext = Context(Courses);
const CourseDetailWithContext = Context(CourseDetail);

const app = () => (
  <Router>

    <Header />
      <Switch>
          <Route exact path="/api/courses" component={CoursesWithContext}/>
          <Route exact path="/api/courses/:id" component={CourseDetailWithContext} />
          <Route path="/api/signin" component={UserSignIn} />
          <Route path="/api/signup" component={UserSignUp} />
      </Switch>
  </Router>
);

export default app;