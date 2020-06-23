import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from './Components/Static/Navbar';
import Home from './Components/Home';
import Login from './Components/Static/Login';
import Register from './Components/Static/Register';
import { setToken } from './services/constants';
import { ProtectedLogin, ProtectedUser, ProtectedAdmin, ProtectedRegister } from './ProtectedRoutes/Protected';
import { getToken } from "./services/constants";
import UserHome from './Components/Users/UserHome';
import AdminHome from "./Components/Admin/AdminHome";
import jwtDecode from 'jwt-decode';

class App extends React.Component{
  constructor(props){
    super(props);
    // Set initial state parameters to null
    let token = getToken();
    let login = token ? true : false;
    let userDetails = null;
    let role = null;
    let images = [];
    let userArray = [];
    // If token is present user is logged in, decode token to get user details.
    if(token){
        userDetails = this.getUserDetails(token);
        role = userDetails.role;
        // If admin get array of all users else get users all images.
        if(role === 'admin'){
          userArray = userDetails.userArray;
        }else{
          images = userDetails.images;
        }
    }
    //Set the state with all values initialized above.
    this.state = {
      login,
      role,
      userDetails,
      images,
      userArray
    }
  }

  // Get user details by decodeing token
  getUserDetails = (token)=>{
    return jwtDecode(token);
  }

  handleLogin = (token)=>{
    //On login update statw with user details
    let userDetails = this.getUserDetails(token);
    let userArray = [];
    let images = [];
    if(userDetails.role === 'admin'){
      userArray = userDetails.userArray;
    }else{
      images = userDetails.images;
    }
    this.setState({
      login: true,
      userDetails,
      role: userDetails.role,
      images,
      userArray
    })
    setToken(token);
  }

  logout = ()=>{
    this.setState({
      login: false,
      userDetails: null,
      role: null,
      images: [],
      userArray: []
    })
    localStorage.removeItem('jwtToken');
  }
                  
  render(){
    return (
      <BrowserRouter >
        <Navbar loginState={ this.state.login } logout={ this.logout }/>
        <Switch>
          <ProtectedLogin exact path="/login" component={ Login } loginFunction={ this.handleLogin } loginState={ this.state.login } role={this.state.role} />
          <ProtectedUser exact path="/user" component={UserHome} loginState={ this.state.login } role={this.state.role} userDetails={this.state.userDetails} images={this.state.images}/>
          <ProtectedAdmin exact path="/admin" component={AdminHome} loginState={ this.state.login } role={this.state.role} userArray={this.state.userArray} />
          <ProtectedRegister exact path="/register" component={ Register } loginState={ this.state.login } role={this.state.role} />
          <Route exact path="/" >
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
