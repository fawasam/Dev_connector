import {combineReducers} from "redux"
import alertReducer from "./alertReducer"
import authReducer from "./authReducer"
import profileReducer from "./profileReducer"
import postReducer from './postReducer'

const rootReducer = combineReducers({
    alertReducer,
    authReducer,
    profileReducer,
    postReducer

}) 

export default rootReducer