import { SIGN_IN, SIGN_IN_GOOGLE, AUTHENTICATE_THE_USER, SIGN_OUT, GET_USERS, DELETE_USER, SIGN_IN_FAIL, GET_BRANDS, DELETE_BRAND, GET_USER } from "../types";
import history from "../history";
import sts from '../apis/sts';
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
            JwtToken.set(response.data.token);
            JwtToken.setUsername(username);
            JwtToken.setJWTDecode(response.data.token);
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
    try {
        // console.log(JwtToken.get());

        if (searchValue === "") {
            searchValue = null;
        }
        const response = await sts.get("admin/users", {
            headers: {
                "Authorization": `Bearer ${JwtToken.get()}`,
            },
            params: {
                PageNumber: pageIndex,
                PageSize: pageSize,
                KeyWord: searchValue
            }
        });
        console.log(response);
        console.log(1);

        console.log();
        dispatch({ type: GET_USERS, payload: { datas: response.data, ...JSON.parse(response.headers.pagination), searchValue } });
    } catch (error) {
        console.log(error);
    }
}

export const getUser = (id) => async dispatch => {
    //TODO fix
    try {
        const api = `/users/${id}`;
        const response = await sts.get(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        dispatch({ type: GET_USER, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = () => async dispatch => {
    //TODO fix
    try {
        const api = "/users/profile";
        const response = await sts.get(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        dispatch({ type: GET_USER, payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (id) => async dispatch => {
    //TODO fix
    try {
        const api = `admin/users/${id}`;
        const response = await sts.delete(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        console.log(error);
    }

}


//GET BRANDS 
export const getBrands = () => async dispatch => {
    try {
        // console.log(JwtToken.get());
        const response = await sts.get("/brands/all", { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        // console.log(response);
        dispatch({ type: GET_BRANDS, payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

//DELETE BRANDS 
export const deleteBrand = (id) => async dispatch => {
    try {
        const api = `/brands/${id}`;
        const response = await sts.delete(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        dispatch({ type: DELETE_BRAND, payload: id });
    } catch (error) {
        console.log(error);
    }
}
