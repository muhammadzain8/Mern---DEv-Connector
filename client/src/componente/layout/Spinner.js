import React,{Fragment} from 'react'
import spinner from './spinner.gif'

export const Spinner= () =>(

    <Fragment>
        <img src={spinner}  style={{width:'150px',margin:'auto',display:'block'}} alt ="loading...." />
    </Fragment>
)
export default Spinner