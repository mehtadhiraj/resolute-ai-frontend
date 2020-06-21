import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from './Components/Static/Navbar';
import Home from './Components/Home';
import Login from './Components/Static/Login';
import Register from './Components/Static/Register';
// import history from './services/history';

class App extends React.Component{
  constructor(props){
    super(props);
    let login = localStorage.getItem('token')? true : false;
    this.state = {
      login
    }
  }

  handleLogin = (token)=>{
    this.setState({
      login: true
    })
    localStorage.setItem('token', token);
  }

  logout = ()=>{
    this.setState({
      login: false
    })
    localStorage.removeItem('token');
  }
                  
  render(){
    return (
      <BrowserRouter >
        <Navbar loginState={ this.state.login } logout={ this.logout }/>
        <Switch>
          <Route exact path="/login">
            <Login loginFunction={this.handleLogin}/> 
          </Route>
          <Route exact path="/register">
            <Register />  
          </Route>
          <Route exact path="/" >
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
