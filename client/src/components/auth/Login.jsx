import React, { useState } from 'react'
import {Link, Redirect} from "react-router-dom"

//redux
import { connect } from 'react-redux'
import { login } from '../../actions/authAction'

const Login = ({login,isAuthenticated}) => {
    const [formData,setFormData] =useState({
        email:"",
        password:"",
    });
    const {email,password} =formData
    const onChange= e=>setFormData({...formData ,[e.target.name]:e.target.value})
    const onSubmit =async e=>
    { 
        e.preventDefault()
        login(email,password)
    }

    //redirect if logged in
    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }


    return (
        <>
    <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i>  Sign in to Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Not yet registered? <Link to="/register">Sign Up</Link>
      </p>

        </>
    )
}

const mapStateToProps =state =>({
  isAuthenticated:state.authReducer.isAuthenticated
})

export default connect(mapStateToProps ,{login})(Login)
