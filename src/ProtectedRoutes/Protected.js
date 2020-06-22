import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedLogin = ({ component: Login, loginFunction, role, loginState, ...rest })=>{
    return(
        <Route {...rest} >
            {
                loginState ? ( role === 'admin' ? <Redirect to="/admin" /> : <Redirect to="/user" />) : <Login loginFunction={loginFunction} />
            }
        </Route>
    )
}

export const ProtectedRegister = ({ component: Register, loginState, role, ...rest })=>{
    return(
        <Route {...rest} >
            {
                loginState ? ( role === 'admin' ? <Redirect to="/admin" /> : <Redirect to="/user" />) : <Register />
            }
        </Route>
    )
}

export const ProtectedUser = ({ component: UserHome, loginState, role, userDetails, images, ...rest })=>{
    return(
        <Route {...rest}>
            {
                loginState ? ( role === 'admin' ? <Redirect to="/admin" /> : <UserHome userDetails={userDetails} images={images} />) : <Redirect to="/login" /> 
            }
        </Route>
    )
}

export const ProtectedAdmin = ({ component: AdminHome, loginState, userArray, role, ...rest })=>{
    return(
        <Route {...rest}>
            {
                loginState ? ( role === 'admin' ? <AdminHome userArray={userArray} /> : <Redirect to="/user" />) : <Redirect to="/login" /> 
            }
        </Route>
    )
}
