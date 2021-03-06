import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest})=> (
    <Route {...rest} render={
        props=>localStorage.getItem("@app: auth")?
        ( <Component {...props} />)   :   (<Redirect to={{ pathname:"/login",  state: { from : props.location} }}/> )
    }/>
);

export default PrivateRoute