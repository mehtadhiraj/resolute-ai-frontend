import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props){
    return(
        <div>
            Navbar   &nbsp;&nbsp;
            <Link to='/'>Home</Link> &nbsp; &nbsp;
            {
                // If loggedin show logout else show login and register
                props.loginState ? 
                    <>
                        <Link to='/login' onClick={props.logout}>Logout</Link>&nbsp;&nbsp;
                    </>
                :
                    <>
                        <Link to='/login'>Login</Link>&nbsp;&nbsp;
                        <Link to='/register'>Register</Link>&nbsp;&nbsp;
                    </>
            }            
        </div>
    )
}


export default Navbar;