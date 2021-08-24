import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCurrentProfile ,deleteAccount } from '../../actions/profileAction'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardAction'
import Education from './Education'
import Experience from './Experience'

const Dashboard = (
    {
        getCurrentProfile, 
        deleteAccount,
        auth:{user},
        profile:{profile,
        loading,
    }}) => {
    
    useEffect(()=>{
     getCurrentProfile();
    
    },[getCurrentProfile])

    return (
        loading && profile ===null ? <Spinner /> :  
        <>
        <h1 className="large text-primary">Dashboard</h1>
        <h2 className="lead">
            <i className="fas fa-user"> </i>  Welcome {user&& user.name}
        </h2>
        {profile !==null ?(
        <>
        <Link to="/edit-profile"  className='btn btn-primary my-1'>
            <i className="fas fa-user-circle"></i>{' '}
            Edit Profile
        </Link>
        <DashboardAction/>
        <Experience experience={profile.experience} />
        <Education education={profile.education}/>
        <div className="my-2">
            <button className="btn btn-danger" onClick={()=> deleteAccount()} >
                <i className="fas fa-user-minus"> {"  "}Delete My Account</i>
            </button>
        </div>
        </> 
        ): (<>
        <p>You have not yet setup a profile,please add some info</p>
        <Link to="/create-profile"  className='btn btn-primary my-1'>
            <i className="fas fa-user-circle"></i>{' '}
            Create Profile
        </Link>
        <DashboardAction/>
        </>)}
        </>
    )
}
const mapStateToProps = state =>({
    auth:state.authReducer,
    profile:state.profileReducer
})

export default connect(mapStateToProps,{getCurrentProfile ,deleteAccount}) (Dashboard)
