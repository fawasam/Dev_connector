import React from 'react'
import { Link } from 'react-router-dom'
const ProfileTop = ({
    profile:{
        status,company,location,website,social,
        user:{name,avatar}
    }
}) => {
    return (

     <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt={name}
          />
          <h1 className="large">{name}</h1>
          <p className="lead">{status && status} {company && <span> at {company}</span> }</p>
          <p>{location}</p>
          <div className="icons my-1">
            {website && (
                <Link to={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
                 </Link>
            )}
            {social && social.twitter && (
            <Link to={"/"} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </Link>
            )}
           { social && social.facebook && (
            <Link to={"/"} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </Link>
           )}
           {social && social.linkedin &&(
            <Link to={"/"} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </Link>
           )}
           {social && social.youtube &&(
             <Link to={"/"} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </Link>
           )}
           {social && social.instagram &&(
            <Link to={"/"} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </Link>
           )}
          </div>  
    </div>        
    )
}

export default ProfileTop
