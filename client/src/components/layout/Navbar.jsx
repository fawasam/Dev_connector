import React from 'react'
import {Link} from "react-router-dom"

//redux
import { connect } from 'react-redux'
import { logout } from '../../actions/authAction'


const Navbar = ({auth:{isAuthenticated ,loading},logout} ) => {

  const authLinks =(
      <ul>
        <li><Link to="/profiles"><i className="fas fa-user"></i> {' '}
          <span className='hide-sm'>
          Developers
          </span> </Link>
        </li>
        <li><Link to="/posts"><i className="fas fa-plus-circle"></i> {' '}
          <span className='hide-sm'>
          Posts
          </span> </Link>
        </li>
        <li><Link to="/dashboard"><i className="fas fa-chart-line"></i> {' '}
          <span className='hide-sm'>
          Dashboard
          </span> </Link>
        </li>
        <li><Link to="/" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> {' '}
          <span className='hide-sm'>
          Logout
          </span> 
         </Link></li>
      </ul>

  );

  const guestLinks =(
       <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  )

    return (
        <div>
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}
    </nav>          
     </div>
    )
}

const mapStateToProps =state =>({
  auth:state.authReducer
})

export default connect(mapStateToProps,{logout}) (Navbar)
