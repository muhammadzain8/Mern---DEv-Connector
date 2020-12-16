import axios from 'axios'

// adding global headers

const setauthToken=token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token']=token;
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setauthToken 