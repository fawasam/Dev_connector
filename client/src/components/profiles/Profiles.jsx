import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllProfile } from '../../actions/profileAction'
import ProfileItem from './ProfileItem'


const Profiles = ({getAllProfile, profile:{profiles,loading}}) => {

    useEffect(()=>{
        getAllProfile()
    },[getAllProfile])
    return (
        <>
        {loading ? <Spinner /> 
        : 
        <>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="profiles">
            {profiles.length > 0 ? (
                profiles.map(profile=>(
                    <ProfileItem key={profile._id} profile={profile} />
                )))
                :
                (
                    <h4>Profiles Not found....</h4>
                )  
        }
        </div>
        </>}
            
        </>
    )
}

const mapStateToProps = state =>({
    profile:state.profileReducer
})

export default connect(mapStateToProps ,{ getAllProfile}) (Profiles)
