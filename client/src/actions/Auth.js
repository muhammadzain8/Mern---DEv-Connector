import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,
    LOGIN_FAIL,LOGOUT,CLEAR_PROFILE} from './Types'
import {setAlert} from './Alert'
import axios from 'axios'
import setauthToken from '../utils/SetauthToken'

export const loadUser=()=>async dispatch =>{
    if(localStorage.token){
        setauthToken(localStorage.token)    // setting token to headers  
    }
    try {
        const response=await axios.get('/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:response.data
        })

    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
        
    }
}

// logout action
export const register=({name,email,password})=>async dispatch =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body=JSON.stringify({name,email,password})    // convert js object to string 
    try{
        const response = await axios.post('/api/users',body,config) // calling nodejs endPoint
        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })
        dispatch(loadUser())                        // setting the token to header
    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg ,'danger')))
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

// login action
export const login=({email,password})=>async dispatch =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body=JSON.stringify({email,password})                 // convert js object to string
    try{    
        const response = await axios.post('/api/auth',body,config) // calling nodejs endPoint
        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })
        dispatch(loadUser()) 
    }catch(error){
        const err=error.response.data.errors;
        if(err){
            err.forEach(e => dispatch(setAlert(e.msg ,'danger')))
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

export const logout=()=>dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    dispatch({
        type:LOGOUT
    })
    
}
  