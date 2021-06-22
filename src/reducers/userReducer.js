import { DELETE_USER, GET_USERS } from "../types";
import _ from 'lodash';

const INIT = {
    currentPage: 1,
    pageSize: 10,
    totalCount:0,
    totalPages:0,
    datas:[],
    searchValue:"",
   
}
export default (state = INIT, action) => {
    
    switch (action.type) {
        case GET_USERS:
            
            const {currentPage, pageSize} = action.payload;
        action.payload.datas = action.payload.datas.map( e=> {
            return {...e, counterStatus:(action.payload.datas.indexOf(e) + (currentPage-1)*pageSize +1), id:e.username }
        }
        );
        action.payload.datas = _.mapKeys(action.payload.datas, 'id');
        return { ...state, ...action.payload };
        case DELETE_USER:  
        console.log('DELETE '+ action.payload);
        let datas = _.omit(state.datas, action.payload);
        let arr =  Object.values(datas);
        console.log(1);
        console.log(state);
        console.log(arr);
        console.log(2);
        let datas1 =arr.map( e=> {
            return {...e, counterStatus:(arr.indexOf(e) + (state.currentPage-1)*state.pageSize +1), id:e.username }
        }
        );
        console.log(datas1);
        return {...state, datas: _.mapKeys(datas1, 'id')};
        default: return state;
    }
}
