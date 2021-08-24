import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGithubRepos, getProfileById} from '../../actions/profileAction'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({
    match,
    getProfileById ,
    profile:{profile,loading},
    auth,
    }) => {

    useEffect(()=>{
    getProfileById(match.params.id)

    },[match.params.id ,getGithubRepos])

    return (
        <>
        {
        profile === null || loading ? 
        <Spinner /> 
        : 
        <>
        <Link to="/profiles" className='btn btn-light' >
            Back to Profile
        </Link>
        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id 
        && 
        ( 
            <Link to="/edit-profile" className='btn btn-dark'> Edit Profile</Link>
            )}

        </>
        } 
        { match.params.id === profile.user._id  ? (
         <div class="profile-grid my-1"> 
         <ProfileTop profile={profile} />
         <ProfileAbout profile={profile}/>
         <div className="profile-exp bg-white p-2">
             <h2 className="text-primary">Experience</h2>
             {profile.experience.length > 0 ?
             (<>
             {
                 profile.experience.map(exp=>(
                     <ProfileExperience key={exp._id} exp={exp} />
                     ))
             }
             </>):
             (
                 <>
                 <h4>No experience credentials available</h4>
                 {auth.user._id===profile.user._id &&
                 <Link  to="/add-experience"><span>Click to add</span></Link>
                 }
                 </>
             )}
         </div>
         <div className="profile-edu bg-white p-2">
             <h2 className="text-primary">Education</h2>
             {profile.education.length > 0 ?
             (<>
             {
                 profile.education.map(edu=>(
                     <ProfileEducation key={edu._id} edu={edu} />
                     ))
             }
             </>):
             (
                 <>
                 <h4>No education credentials available</h4>
                 {auth.user._id===profile.user._id &&
                 <Link  to="/add-education"><span>Click to add</span></Link>
                 }
                 </>
             )}
         </div>
         {profile.githubusername && (
             <ProfileGithub username={profile.githubusername} />
             )}
         </div>
         
        ):<Spinner />}
        </>
    )
}

const mapStateToProps = state => ({
    profile:state.profileReducer,
    auth:state.authReducer

})

export default connect(mapStateToProps , {getProfileById}) (Profile)
