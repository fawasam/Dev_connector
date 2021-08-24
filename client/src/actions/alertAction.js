import { SET_ALERT,REMOVE_ALERT } from "./constatnts";
import { v4 as uuidv4 } from 'uuid';

//here setalert action (a function) that dispatch the type of SET_ALERT to the reducers and it add to the alert to state

export const setAlert=(msg,alertType) => dispatch =>{
    const id =uuidv4()
    dispatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    });
    setTimeout(()=>dispatch({type:REMOVE_ALERT ,payload :id}) , [3000])

}