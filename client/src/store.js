
//first of all create store 

import  {createStore ,applyMiddleware} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const initialState ={}
const middleware =[thunk]

//store = reducers + initialstate + middleware
const store =createStore(rootReducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store;
