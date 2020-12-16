import React,{Fragment,useEffect} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './componente/layout/Navbar'
import Landing from './componente/layout/Landing'
import './App.css'
import Login from './componente/auth/Login'
import Register from './componente/auth/Register'
import {Provider} from 'react-redux'
import store from './Store'
import Alert from './componente/layout/Alert'
import Dashboard from './componente/dashboard/Dashboard'
import PrivateRoute from './componente/routing/PrivateRouting'
import CreateProfile from './componente/profile-form/CreateProfile'
import EditProfile from './componente/profile-form/EditProfile'
import AddExperience from './componente/profile-form/AddExperience'
import AddEducation from './componente/profile-form/AddEducation'
import {loadUser} from './actions/Auth'
import setauthToken from './utils/SetauthToken'
import Profiles from './componente/profiles/Profiles'
import Profile from './componente/profile/Profile'
import Posts from './componente/posts/Posts'
import Post from './componente/post/Post'

if(localStorage.token){
  setauthToken(localStorage.token)
}
const App = () => {
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className='container'>

              <Alert />    

              <Switch>

                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/post/:id' component={Post} />

              </Switch>
            </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
