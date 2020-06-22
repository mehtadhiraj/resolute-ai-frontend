import React from 'react';
import axios from 'axios';
import { API_URL } from '../../services/constants';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        // console.log(this);
        let { username, password } = this.state;
        axios.post(API_URL+"login", { username, password })
            .then(response => {
                // console.log(response);
                this.props.loginFunction(response.data.token);
            })
            .catch(error => {
                console.log(error);
            })
    
        this.setState({
            username: "",
            password: ""
        })
    }
    
    render(){
        return(
            <div>
                <br/><br/> Login <br/><br/>
                <form onSubmit={ this.handleSubmit } >
                    <label htmlFor="username">Username : </label>
                    <input type="text" name="username" id="username" value={ this.state.username } onChange={ this.handleChange } /><br/><br/>
                    <label htmlFor="passwrod">Password : </label>
                    <input type="password" name="password" id="password" value={ this.state.password } onChange={ this.handleChange } /> <br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;