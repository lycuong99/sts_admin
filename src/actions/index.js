import { SIGN_IN, SIGN_IN_GOOGLE, AUTHENTICATE_THE_USER, SIGN_OUT, GET_USERS, DELETE_USER } from "../types";
import history from "../history";
import sts from '../apis/sts';
import { users } from "../dataTest.js/user";

export const signIn = (username, password) => async (dispatch) => {
    dispatch({
        type: SIGN_IN,
        payload: {
            username, password
        }
    });

    localStorage.setItem('token', "123456");
    history.replace("/");

}

export const signInWithGoogle = (userId) => {
    return {
        type: SIGN_IN_GOOGLE,
        payload: userId
    }
}

export const authenticateUser = () => {
    return {
        type: AUTHENTICATE_THE_USER
    }
}

export const logOut = () => {
    return {
        type: SIGN_OUT,
    }
}


//USER
export const getUsers = () => async dispatch => {
    //TODO fix
    // const response = await sts.get('/users');
    const responseTmp = users;
    console.log(responseTmp);
    dispatch({ type: GET_USERS, payload: responseTmp });
}

export const getUser = (id) => async dispatch => {
    //TODO fix
    // const response = await sts.get('/users');
    const responseTmp = users;
    console.log(responseTmp);
    dispatch({ type: GET_USERS, payload: responseTmp });
}

export const deleteUser = (id) => async dispatch => {
    //TODO fix
    // const response = await sts.get('/users');
    const responseTmp = users;
    console.log('DELETE USER: ' + id);
    dispatch({ type: DELETE_USER, payload: id });
}

