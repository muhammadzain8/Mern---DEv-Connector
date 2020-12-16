import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect} from 'react-redux'
import {getProfiles} from '../../actions/Profile'
import ProfileItem from './ProfileItem'

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
        getProfiles()
    },[getProfiles])
    
    return (
       <Fragment>
       {loading ? <Spinner /> : 
        <Fragment>
            <h1 className="large text-primary">Developer</h1>
            <p className="lead">
                <i className="fa fa-connectdevelop"></i> Connect with Developers 
            </p>
            <div className="profiles">
                {profiles.length>0?(
                    profiles.map(profile=>(
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ):<h3> No Profile found </h3>}
            </div>
        </Fragment>
        }
       </Fragment>
    )
}
Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}  
const mapStateToProps=state =>({
    profile:state.profile
})
export default connect(mapStateToProps,{getProfiles})(Profiles)
