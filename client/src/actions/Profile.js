import axios from 'axios'
import {setAlert} from './Alert'
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,DELETE_ACCOUNT,CLEAR_PROFILE,GET_PROFILES} from './Types'

// get current user profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/profile/me') // calling nodejs endPoint
        dispatch({
            type:GET_PROFILE,
            payload:response.data
        })

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:err
        })
    }
}

// get all profiles 
export const getProfiles = () => async (dispatch) => {
    dispatch({type:CLEAR_PROFILE})
    try {
        const response = await axios.get('/api/profile')
        dispatch({
            type:GET_PROFILES,
            payload:response.data
        })

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:err
        })
    }
}
// get profile by id
export const getProfileById = id => async (dispatch) => {
    try {
        const response = await axios.get(`/api/profile/user/${id}`)
        dispatch({
            type:GET_PROFILE,
            payload:response.data
        })

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:err
        })
    }
}


// create profile 
export const createProfile=(formdata,history,edit=false)=>async (dispatch) =>{
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post('/api/profile',formdata,config)
        dispatch({
            type:GET_PROFILE,
            payload:response.data
        })
        dispatch(setAlert(edit ? 'Profile Updated ':'Profile Created', 'success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (error) {
        const err=error.response.data.errors;
        if(err){
            err.forEach(e => dispatch(setAlert(e.msg ,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// Add experience 

export const addExperience=(formdata,history) => async (dispatch) => {
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put('/api/profile/experience',formdata,config)
        console.log(response)
        dispatch({
            type:UPDATE_PROFILE,
            payload:response.data
        })
        dispatch(setAlert('Experience added', 'success'))
        history.push('/dashboard')
} catch (error) {
        const err=error.response.data.errors;
        if(err){
            err.forEach(e => dispatch(setAlert(e.msg ,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// add education

export const addEducation =(formdata,history) => async (dispatch) => {
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put('/api/profile/education',formdata,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:response.data
        })
        dispatch(setAlert('Education added', 'success'))
        history.push('/dashboard')
} catch (error) {
    const err=error.response.data.errors;
    if(err){
        err.forEach(e => dispatch(setAlert(e.msg ,'danger')))
    }
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText, status:error.response.status}
    })
}
}

// delete experience
export const deleteExperience=id=> async dispatch =>{
    try {
        const response = await axios.delete(`/api/profile/experience/'${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:response.data
        })
        dispatch(setAlert('experirence deleted ', 'success'))

    } catch (error) {
        dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}


// delete education
export const deleteEducation=id=> async dispatch =>{
    try {
        const response = await axios.delete(`/api/profile/education/'${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:response.data
        })
        dispatch(setAlert('education deleted ', 'success'))

    } catch (error) {
        dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// delete accout and profile 

export const deleteAccount=id=> async dispatch =>{
  if(window.confirm('Are you sure you want to delete this account')){
    try {
        await axios.delete(`/api/profile`)
        dispatch({
            type:CLEAR_PROFILE,
        })
        dispatch({
            type:DELETE_ACCOUNT
        })
        dispatch(setAlert('Accoun has been deleted ', 'success'))

    } catch (error) {
        dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
  }
}