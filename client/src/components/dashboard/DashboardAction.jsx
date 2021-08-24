import React from 'react'
import { Link } from 'react-router-dom'

const DashboardAction = () => {
    return (
        <div className='dash-buttons'>

        <Link to="/add-experience"  className='btn btn-primary my-1'>
            <i className="fas fa-address-card"></i>{' '}
            Add Experience
        </Link>
        <Link to="/add-education"  className='btn btn-primary my-1'>
            <i className="fas fa-graduation-cap"></i>{' '}
            Add Education
        </Link>
            
        </div>
    )
}

export default DashboardAction
