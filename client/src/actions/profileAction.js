import axios from "axios"
import {
    GET_PROFILE,
    PROFILE_ERROR,UPDATE_PROFILE,
    CLEAR_PROFILE,DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS
} from "../actions/constatnts";

import { setAlert } from "./alertAction";


//GET CURRENT USER PROFILE

export const getCurrentProfile =() =>async dispatch =>{
    try {
        
        const res= await axios.get("/api/profile/me")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText , status:error.response.status}
        })
        
    }

}

//GET CURRENT USER PROFILE BY ID

export const getProfileById =(userId) =>async dispatch =>{
    
    try {
        const res= await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText , status:error.response.status}
        })
        
    }
}


//GET =GITHUB repos

export const getGithubRepos =(username) =>async dispatch =>{

    try {
        const res= await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText , status:error.response.status}
        })
        
    }
}

//GET ALL PROFILES
export const getAllProfile =() =>async dispatch =>{
    // dispatch({type:CLEAR_PROFILE})
    try {
        
        const res= await axios.get("/api/profile")
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText , status:error.response.status}
        })
        
    }

}


//@route CREATE OR UPDATE  POST api/profile/me

export const createProfile =(formData,history,edit=false) =>async dispatch =>{
    try {

     const config ={
            headers:{
                 "Content-Type":"application/json"
        }
    }
    const res =await axios.post("/api/profile" ,formData,config)
    dispatch({
        type:GET_PROFILE,
         payload:res.data
    })
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created' ,'success'))    

  
        history.push("/dashboard")
    
        
    } catch (error) {
    const errors =error.response.data.errors
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg , "danger")))
    }
     dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
    })   
    }
}







//ADD EXPERIENCE 
export const addExperience = (formData ,history) => async dispatch=>{
    try {

     const config ={
            headers:{
                 "Content-Type":"application/json"
        }
    }

    const res =await axios.put("/api/profile/experience",formData,config)
    dispatch({
        type:UPDATE_PROFILE,
         payload:res.data
    })
    dispatch(setAlert('Experience added ', 'success'))    

        history.push("/dashboard")
        
    } catch (error) {
    const errors =error.response.data.errors
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg , "danger")))
    }
     dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
    })   
    }
}








//ADD EDUCATION 
export const addEducation = (formData ,history) => async dispatch=>{
    try {

     const config ={
            headers:{
                 "Content-Type":"application/json"
        }
    }
    const res =await axios.put("/api/profile/education",formData,config)
    dispatch({
        type:UPDATE_PROFILE,
         payload:res.data
    })
    dispatch(setAlert('Education added ', 'success'))    

        history.push("/dashboard")
        
    } catch (error) {
    const errors =error.response.data.errors
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg , "danger")))
    }
     dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
    })   
    }
}

//DELETE EXPERIENCE

export const deleteExp =(id)=>async dispatch =>{
 if(window.confirm("Are you sure want to delete permenantly ?"))
    {
    try {
        const res =await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
      dispatch(setAlert('Experience removed successfully ', 'success'))        
    } catch (error) {
           dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
    })  
    }
}
}

//DELETE Education

export const deleteEdu =(id)=>async dispatch =>{
 if(window.confirm("Are you sure want to delete permenantly ?"))
    {
    try {
        const res =await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
      dispatch(setAlert('Education removed successfully ', 'success'))        
    } catch (error) {
           dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
    })  
    }
}
}

//DELETE ACCOUNT AND PROFILE

export const deleteAccount =()=>async dispatch =>{

    if(window.confirm("Are you sure want to delete permenantly ?"))
    {

        try {
            await axios.delete(`/api/profile`);
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:DELETE_ACCOUNT});
            dispatch(setAlert('Account removed Succesfully'))        
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText , status:error.response.status}
            })  
        }
    }
}
