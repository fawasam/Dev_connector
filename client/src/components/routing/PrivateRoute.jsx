import React from 'react'
import {connect} from "react-redux"
import { Route ,Redirect } from 'react-router'


//protect routing very commom and important 

const PrivateRoute = ({component:Component ,auth:{isAuthenticated ,loading}, ...rest}) => (
    <Route 
    {...rest} 
    render={props =>
        !isAuthenticated && !loading 
        ?(<Redirect to="/login"/> ):(<Component {...props} 
        /> )
    }>
    </Route>
)

const mapStateToProps = state =>({
    auth:state.authReducer
})

export default connect(mapStateToProps) (PrivateRoute)
