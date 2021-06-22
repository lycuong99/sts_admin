import { DELETE_BRAND, GET_BRANDS } from "../types";
import _ from 'lodash';

const brandReducer = (state = [], action) => {

    console.log(state);
    switch (action.type) {

        case GET_BRANDS:   return { ...state, ..._.mapKeys(action.payload, 'id')}; 
        case DELETE_BRAND:    return _.omit(state, action.payload);

        default: return state;
    }
};

export default brandReducer;