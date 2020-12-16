import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addEducation} from '../../actions/Profile'

const AddEducation = ({addEducation,history}) => {
    const [formdata,setFormdata]=useState({
        school:'',degree:'',fieldofstudy:'',from:'',to:'',current:false,description:''
    })
    const [toDateDisabled,toggleDate]=useState(false)
    const {school,degree,fieldofstudy,from,to,current,description}=formdata;
    const onChange=e=>{
        setFormdata({...formdata, [e.target.name]:e.target.value})
    }

    return (
    <Fragment> 
    <h1 className="large text-primary">
    Add Your Education
   </h1>
   <p className="lead">
     <i className="fa fa-code-branch"></i> Add any school,bootcamp
   </p>
   <small>* = required field</small>
   <form className="form" onSubmit={e => {
       e.preventDefault()
       addEducation(formdata,history)
   }}>
     <div className="form-group">
       <input type="text" placeholder="* School/Bootcamp" name="school" value={school} onChange={(e) =>onChange(e)} required />
     </div>
     <div className="form-group">
       <input type="text" placeholder="* Degree " name="degree" value={degree} onChange={(e) =>onChange(e)} required />
     </div>
     <div className="form-group">
       <input type="text" placeholder="Fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange={(e) =>onChange(e)} />
     </div>
     <div className="form-group">
       <h4>From Date</h4>
       <input type="date" name="from" value={from} onChange={(e) =>onChange(e)} />
     </div>
      <div className="form-group">
       <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e) => {
            setFormdata({...formdata,current:!current});
            toggleDate(!toDateDisabled)
        }} />{' '} Current Study  </p>
     </div>
     <div className="form-group">
       <h4>To Date</h4>
       <input type="date" name="to" value={to} onChange={(e) =>onChange(e)} disabled={toDateDisabled? 'disabled':''}/>
     </div>
     <div className="form-group">
       <textarea
         name="description"
         cols="30"
         rows="5"
         placeholder="Programe Description"
         value={description} onChange={(e) =>onChange(e)}
       ></textarea>
     </div>
     <input type="submit" className="btn btn-primary my-1" />
     <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
   </form> 
    </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired 
}

export default connect(null,{addEducation})(withRouter(AddEducation))
