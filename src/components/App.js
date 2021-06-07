import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from "react-router";
import Login from './auth/Login';
import history from "../history";
import { connect } from "react-redux";
import RequireAuth from './auth/RequireAuth';
import UserTable from './UserTable';
import BrandTable from './BrandTable';
import Layout from './layout';
import Profile from './Profile';
import theme from '../themes/Theme';
import { ThemeProvider } from '@material-ui/styles';

class App extends React.Component {

  render() {

    return (
      <div>
        <ThemeProvider theme={theme}>
          <Router forceRefresh={true} history={history} >
            <Switch>
              <Route path='/login' exact >
                <Login />
              </Route>
              <RequireAuth>
                <Layout>
                  <Route path='/' exact >
                    <UserTable />
                  </Route>
                  <Route path='/user' exact >
                    <UserTable />
                  </Route>
                  <Route path='/brand' exact >
                    <BrandTable />
                  </Route>
                  <Route path='/profile' exact >
                    <Profile />
                  </Route>
                </Layout>
              </RequireAuth>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default connect()(App);
