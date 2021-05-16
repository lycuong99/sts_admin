import { GET_USERS } from "../types";

export default (state = [], action) => {
    switch (action.type) {

        case GET_USERS: return { ...state, ...action.payload };

        default: return state;
    }
}
