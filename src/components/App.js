import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from "react-router";
import Login from './auth/Login';
import history from "../history";
import { connect } from "react-redux";
import RequireAuth from './auth/RequireAuth';
import Logout from './auth/Logout';
import { Home } from '@material-ui/icons';
import UserTable from './UserTable';
import routes from '../router';
import Sidebar from '../components/Sidebar/Sidebar.js';


class App extends React.Component {



  render() {

    return (
      
      <div>

        <Router forceRefresh={true} history={history} >
          <Switch>
            <Route path='/login' exact >
              <Login />
            </Route>
            <Route path='/' exact >
              <RequireAuth>
                <UserTable />
                <Logout />
              </RequireAuth>
            </Route>
             </Switch>
        </Router>

      </div>
    );
  }
}

export default connect()(App);
