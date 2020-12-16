import axios from 'axios' 
import {setAlert} from './Alert'
import {GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT} from './Types'

// get posts
export const getPosts =()=>async dispatch =>{
    try {
        const response = await axios.get('/api/posts')
        dispatch({
            type:GET_POSTS,
            payload:response.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// get post
export const getPost =(id)=>async dispatch =>{
    try {
        const response = await axios.get(`/api/posts/${id}`)

        dispatch({
            type:GET_POST,
            payload:response.data
        })
        
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// Add Post 
export const addPost =(formdata)=>async dispatch =>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const response=await axios.post(`/api/posts`,formdata,config)

        dispatch({
            type:ADD_POST,
            payload:response.data
        })
        dispatch(setAlert('Post Created ','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// Add like 
export const addLike=(id)=>async dispatch =>{
    try {
        const response = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload:{id,likes:response.data}
        })
        
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// remove like 
export const removeLike =(id)=>async dispatch =>{
    try {
        const response = await axios.delete(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:response.data}
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}
// Delete Post 
export const deletePost =(id)=>async dispatch =>{
    try {
        await axios.delete(`/api/posts/${id}`)

        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert('Post removed','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// Add Comment
export const addComment =(id,formdata)=>async dispatch =>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const response=await axios.post(`/api/posts/comment/${id}`,formdata,config)

        dispatch({
            type:ADD_COMMENT,
            payload:response.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}


// Delete Comment
export const deleteComment =(postID,commentID)=>async dispatch =>{
    try {
        await axios.delete(`/api/posts/comment/${postID}/${commentID}`)

        dispatch({
            type:REMOVE_COMMENT,
            payload:commentID
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR, 
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}