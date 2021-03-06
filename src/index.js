import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';
import { SIGN_IN, SIGN_OUT } from './types';
import JwtToken from './jwtToken';
// import reportWebVitals from './reportWebVitals';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


if (JwtToken.get() && JwtToken.getJWTDecodeObj()) {
  let username = JwtToken.getUsername();
  var user = JwtToken.getJWTDecodeObj();
  var dateNow = new Date();
  let dateExp = new Date(user.exp * 1000);
  if (dateExp < dateNow) {

    console.log(user.exp);
    store.dispatch({
      type: SIGN_OUT
    });
  } else {
    store.dispatch({
      type: SIGN_IN, payload: {
        username
      }
    });
  }

}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
