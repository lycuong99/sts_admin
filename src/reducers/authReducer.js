import { SIGN_IN, SIGN_IN_GOOGLE, SIGN_OUT, SIGN_IN_FAIL } from "../types";


const INIT_STATE = {
    authenticated: false,
    userId: null,
    invalid: false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //TODO NEED TO MODIFI SIGN_IN REDUCER
        //
        case SIGN_IN_FAIL:  return { ...state, authenticated: false, invalid: true };
        case SIGN_IN: return { ...state, authenticated: true, userId: action.payload.username, invalid: false };
        case SIGN_IN_GOOGLE: return { ...state, authenticated: true, userId: action.payload };
        case SIGN_OUT: localStorage.removeItem('sts_token'); return { ...state, authenticated: false, userId: null };
        default: return state;
    }
}
