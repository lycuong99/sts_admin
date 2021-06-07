import userReducer, { useReducer } from "./userReducer";
import { combineReducers } from "redux";
import { reducer as reducerForm } from 'redux-form';
import authReducer from "./authReducer";
import brandReducer from "./brandReducer";

export default combineReducers({
    form: reducerForm,
    auth: authReducer,
    users: userReducer,
    brands: brandReducer
});