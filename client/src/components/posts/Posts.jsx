import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/postAction'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts , post : {posts ,loading}}) => {
    useEffect(()=>{
        getPosts()
    },[getPosts])

    return loading  ? (<Spinner/>) :(
        <>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fas fa-user"></i>  Welocme to the community
        </p>
        <PostForm/>
        <div className="posts">
            {posts.map(post=>(            
                <PostItem key={post._id} post={post}  />         
            ))}
        </div>
            
        </>
)}

const mapStateToProp =state =>({
    post:state.postReducer
})
export default connect(mapStateToProp ,{ getPosts }) (Posts)
