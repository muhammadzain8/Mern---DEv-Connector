import {combineReducers} from 'redux'
import alert from './Alert'
import auth from './Auth'
import profile from './Profile'
import post from './Post'

export default combineReducers({
    alert,
    auth,
    profile,
    post
})