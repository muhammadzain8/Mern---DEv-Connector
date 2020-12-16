import React,{useEffect,Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/Profile'
import {Spinner} from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import 'font-awesome/css/font-awesome.css'
import Experience from './Experience'
import Education from './Education'


const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {

    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile])
    console.log(profile)
    
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard </h1>
        <p className="lead"><i className="fa fa-user"></i>Welcome {user && user.name} </p>

        {profile !== null ? 
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.profile.experience} />
                <Education education={profile.profile.education} />
                <div className="my-2">
                    <button onClick={()=>deleteAccount()} className="btn btn-danger">
                    <i className="fa fa-user"></i> Delete My Account </button>
                </div>
            </Fragment> 
            : <Fragment>
                You don't have any Profile Please Create One <br />
                <Link to='/create-profile' className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps=state =>({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
