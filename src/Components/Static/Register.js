import React from 'react';
import axios from 'axios';
import Capture from "./Webcam";
import { API_URL } from '../../services/constants';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            name: "",
            email: "",
            gender: "",
            dob: "",
            image: [],
            message: null
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    pushImage = (imageSrc)=>{
        this.setState({
            image: [...this.state.image, imageSrc]
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        // console.log(this.state);
        axios.post(API_URL+"register", this.state)
            .then(response => {
                // console.log(response);
                this.setState({
                    message: "Registeref Succesfully"
                })
            })
            .catch(error => {
                console.log(error);
            })
    
        this.setState({
            username: "",
            password: "",
            name: "",
            email: "",
            gender: "",
            dob: "",
            image: [],
            message: "Registeref Succesfully"
        })
    }
    render(){
        return(
            <div>
                <br/><br/> Register <br/><br/>
                <form onSubmit={ this.handleSubmit } >
                    <label htmlFor="name">Name : </label>
                    <input type="text" name="name" id="name" value={ this.state.name } onChange={ this.handleChange } /><br/><br/>
                    <label htmlFor="email">email : </label>
                    <input type="email" name="email" id="email" value={ this.state.email } onChange={ this.handleChange } /> <br/><br/>
                    <label htmlFor="gender">gender : </label>
                    <span id="gender">
                        <label htmlFor="male">Male : </label>
                        <input type="radio" name="gender" id="male" value="Male" checked={ this.state.gender === "Male" } onChange={ this.handleChange } /> &nbsp;&nbsp;
                        <label htmlFor="female">Female : </label>
                        <input type="radio" name="gender" id="female" value="Female" checked={ this.state.gender === "Female" } onChange={ this.handleChange } /> &nbsp;&nbsp;
                        <label htmlFor="other">Other : </label>
                        <input type="radio" name="gender" id="other" value="Other" checked={ this.state.gender === "Other" } onChange={ this.handleChange } /><br/><br/>
                    </span>
                    <label htmlFor="dob">Date of Birth : </label>
                    <input type="date" name="dob" id="dob" value={ this.state.dob } onChange={ this.handleChange } /> <br/><br/>
                    <label htmlFor="username">Username : </label>
                    <input type="text" name="username" id="username" value={ this.state.username } onChange={ this.handleChange } /><br/><br/>
                    <label htmlFor="passwrod">Password : </label>
                    <input type="password" name="password" id="password" value={ this.state.password } onChange={ this.handleChange } /> <br/><br/>
                    {
                        this.state.image.map((image, index)=>
                            <img alt={index+" Image "} src={image} key={index} width="200px" height="auto"/>
                        )
                    }
                    <br/><br/>
                    <Capture pushImage={ this.pushImage } image={ this.state.image }/>  <br/><br/>
                    <button type="submit">Submit</button>
                </form>
                <h1>
                    <strong>
                        {this.state.message}
                    </strong>
                </h1>
            </div>
        )
    }
    
}

export default Register;