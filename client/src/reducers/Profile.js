import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,CLEAR_PROFILE,GET_PROFILES} from '../actions/Types'

const initialState={
    profile:null,
    profiles:[],
    loading:true,
    error:{}
}

export default function(state= initialState, action) {
    const {type,payload}=action
    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {...state,profile:payload,loading:false} // it creates new object and add new data to that object
        case GET_PROFILES:
            return {...state,profiles:payload,loading:false}
        case PROFILE_ERROR:            
            return {...state,error:payload,loading:false}
        case CLEAR_PROFILE:
            return {...state,profile:null,loading:false}
        default: 
            return state
    }
}