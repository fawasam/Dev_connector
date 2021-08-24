import axios from "axios"
import {
    POST_ERROR,
    GET_POSTS ,
    UPDATE_LIKE,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} 
from "../actions/constatnts";

import { setAlert } from "./alertAction";

//GET POSTS
export const getPosts = () => async dispatch =>{
    try {
        const res =await axios.get("/api/posts")
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
        
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}

//GET single POST

export const getPost = (id) => async dispatch =>{
    try {
        const res =await axios.get(`/api/posts/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
        
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}


//ADD LIKE A POSTS
export const addLikes = (id) => async dispatch =>{
    try {
        const res =await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKE,
            payload:{id , likes:res.data}
        })
        
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}

//remove LIKE from a POSTS

export const removeLikes = (id) => async dispatch =>{ 
    try {
        const res =await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type:UPDATE_LIKE,
            payload:{id , likes:res.data}
        })
        
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}


//creat a post

export const addPost = (formData) => async dispatch =>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res =await axios.post("/api/posts" ,formData, config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post Created', 'success'))
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}

//DELETE a post

export const deletePost = (id) => async dispatch =>{

    try {
        const res =await axios.delete(`/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert('Post removed succesfully', 'success'))
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}


//ADD COMMENTS

export const addComment = (postId,formData) => async dispatch =>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res =await axios.post(`/api/posts/comment/${postId}` ,formData, config)
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert('Comment added', 'success'))
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
} 

//DELETE COMMENTS

export const deleteComment = (postId,commentId) => async dispatch =>{
    try {
        const res =await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        })
        dispatch(setAlert('Comment removed', 'success'))
    } catch (error) {
         dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText , status:error.response.status}
        })     
    }
}