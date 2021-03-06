import axios from "axios"
import { REGISTER_FAIL,
    REGISTER_SUCCESS , 
    AUTH_ERROR,
    USER_LOADED 
    ,LOGIN_FAIL
    ,LOGIN_SUCCESS,
     LOGIN_OUT,
     CLEAR_PROFILE
} from "../actions/constatnts";

import { setAlert } from "./alertAction";
import setAuthToken from "../utils/setAuthToken"


//load user

export const loadUser = () => async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res =await axios.get("/api/auth")
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//register user

export const register =({name ,email ,password}) => async dispatch =>{
        const config ={
            headers:{
                 "Content-Type":"application/json"
        }
    }
    const body =JSON.stringify({name ,email ,password})
    try {
        const res =await axios.post("/api/users" , body ,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
        
    } catch (error) {
        const errors =error.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg , "danger")))
        }
        dispatch({
            type:REGISTER_FAIL,
        })
        console.log(error);
    }

}
//login user

export const login =(email ,password) => async dispatch =>{
        const config ={
            headers:{
                 "Content-Type":"application/json"
        }
    }
    const body =JSON.stringify({ email ,password})
    try {
        const res =await axios.post("/api/auth" , body ,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())        
    } catch (error) {
        const errors =error.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg , "danger")))
        }
        dispatch({
            type:LOGIN_FAIL,
        })
        console.log(error);
    }

}


//logout and clear
export const logout =()=> dispatch =>{
    setTimeout(()=>{
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOGIN_OUT})
    },[2000])
}