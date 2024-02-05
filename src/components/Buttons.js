import * as React from 'react'
// import '../styles/Buttons'

export default function Buttons(props) {
    return (
        <div className='row'>
            <div className='col-md-12 text-center' style={{marginTop: "30px"}}>
                <button className='btn' style={{margin: "10px"}} onClick={props.parentRegister}>Register</button>
                <button className='btn' style={{margin: "10px"}} onClick={props.parentLogin}>Parent Login</button>
                <button className='btn' style={{margin: "10px"}} onClick={props.childLogin}>Child Login</button>
            </div>
            
        </div>
    )
}

