import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';
import { SIGN_IN } from './types';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home.js";
// import reportWebVitals from './reportWebVitals';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const token = localStorage.getItem('token');
// const userId = localStorage.getItem('user');
if (token) {
  let username = "lycuong";
  let password = "123";
  store.dispatch({
    type: SIGN_IN, payload: {
      username, password
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  // <BrowserRouter>
  //   <Switch>
  //     <Route path="/home" component={Home} />
  //     <Redirect from="/" to="/home/user" />
  //   </Switch>
  // </BrowserRouter>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
