import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';


// Components
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';
import Confirm from './components/Confirm';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const App = () => {

  return (
    <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signout" component={UserSignOut} />
            <Route path="/confirm" component={Confirm} />
            <PrivateRoute path="/courses/create" component={CreateCourse} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/error" component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </Router>
    </div>
  );
};

export default App;