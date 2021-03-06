import { REGISTER_FAIL,REGISTER_SUCCESS,AUTH_ERROR ,USER_LOADED , LOGIN_SUCCESS,LOGIN_FAIL ,LOGIN_OUT,DELETE_ACCOUNT } from "../actions/constatnts";

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}
const authReducer=(state=initialState , action)=>{
    const {type , payload} =action;
    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }   

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token" , payload.token)
            return { 
                ...state, 
                payload , 
                isAuthenticated:true ,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGIN_OUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem("token");
            return { 
                ...state, 
                isAuthenticated:false ,
                loading:false
            }
    
        default:
             return state;
    }

}

export default authReducer