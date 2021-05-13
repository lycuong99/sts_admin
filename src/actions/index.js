import { SIGN_IN, SIGN_IN_GOOGLE, AUTHENTICATE_THE_USER, SIGN_OUT } from "../types";
import history from "../history";

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