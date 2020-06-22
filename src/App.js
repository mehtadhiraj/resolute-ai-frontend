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
// import history from './services/history';

class App extends React.Component{
  constructor(props){
    super(props);
    let token = getToken();
    let login = token ? true : false;
    let userDetails = null;
    let role = null;
    let images = [];
    let userArray = [];
    if(token){
        userDetails = this.getUserDetails(token);
        role = userDetails.role;
        if(role === 'admin'){
          userArray = userDetails.userArray;
        }else{
          images = userDetails.images;
        }
    }
    this.state = {
      login,
      role,
      userDetails,
      images,
      userArray
    }
  }

  getUserDetails = (token)=>{
    return jwtDecode(token);
  }

  handleLogin = (token)=>{
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
      images: []
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
