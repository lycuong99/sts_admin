import { SIGN_IN, SIGN_IN_GOOGLE, AUTHENTICATE_THE_USER, SIGN_OUT, GET_USERS, DELETE_USER, SIGN_IN_FAIL, GET_BRANDS, DELETE_BRAND } from "../types";
import history from "../history";
import sts from '../apis/sts';
import { users } from "../dataTest.js/user";
import JwtToken from "../jwtToken";

export const signIn = (username, password) => async (dispatch) => {

    console.log('response1');

    try {
        const response = await sts.post("auth/login", {
            username, password
        });
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: SIGN_IN,
                payload: {
                    username
                }
            });
            localStorage.setItem('sts_token', response.data.token);
            history.replace("/");
        }
    } catch (error) {
        console.log('Sign In fail');
        dispatch({
            type: SIGN_IN_FAIL,
        });
    }



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
export const getUsers = (pageIndex, pageSize, searchValue) => async dispatch => {
    //TODO fix
    // const response = await sts.get('/users');
    const responseTmp = users;
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

}


//GET BRANDS 
export const getBrands = () => async dispatch => {
    try {
        // console.log(JwtToken.get());
        const response = await sts.get("/brands", { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        // console.log(response);
        dispatch({ type: GET_BRANDS, payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

//DELETE BRANDS 
export const deleteBrand = (id)=> async dispatch => {
    try {
        const api = `/brands/${id}`;
        const response = await sts.delete(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        dispatch({ type: DELETE_BRAND, payload: id });
    } catch (error) {
        console.log(error);
    }
}
