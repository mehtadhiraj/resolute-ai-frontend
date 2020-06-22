import axios from 'axios';

export const setHeader = function(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
}

export const setToken = function(token){
    localStorage.setItem('jwtToken', token);
}

export const getToken =  function(){
    return localStorage.getItem("jwtToken");
}

export const API_URL = "http://localhost:3001/";