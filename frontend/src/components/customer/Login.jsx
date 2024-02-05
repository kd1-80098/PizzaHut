import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import { createurl, log, constants } from '../../env';

function Login({setLive,flip}) {

    const [lemail, setLEmail] = useState('');
    const [lpassword, setLPassword] = useState('');


    const history = useHistory();  //used older version because of there was getting error in routing between pages while using latest version of react-router-dom. so used 5.3.0  version.

    const showPassword1 = () => {
        var pass1 = document.getElementById('pass1');
        var eye1 = document.getElementById('eye1');
        var eye2 = document.getElementById('eye2');
    
        if(pass1.type === 'password'){
          pass1.type = 'text';
          eye2.style.display = 'block';
          eye1.style.display = 'none';
        }
        else{
          pass1.type = 'password';
          eye2.style.display = 'none';
          eye1.style.display = 'block';
        }
      };

      const login = async() => {
        debugger;
        if(lemail === '' || lpassword === ''){
          toast.error("Please fill all the required fields", {autoClose:1500});
        }else if(!emailValidation(lemail))
        {
            toast.error("please enter valid email id");
        }
        else{
          const url = createurl('/users/login');
          axios.post(url,
            {
              "email": lemail,
              "password": lpassword,
            })
            .then(res => {
              debugger;
              if(res.data.error === 'user not found. please check your email id.'){
                toast.error("user not found. please check your email id.", {autoClose: 2500});
              }else if(res.data.error === 'entered password is wrong'){
                toast.error("entered password is wrong", {autoClose: 1500});
              }
              else{
                var id = res.data.user_id;
                var token = res.data.token;
                sessionStorage.setItem("userId", id);
                sessionStorage.setItem("token", token);
                history.push('/');
              }
            })
            .catch(error => {
              debugger;
              log(error);
              toast.error("server is under maintenance", {autoClose: 1500});
              setLive(false);
            });
        }
      };

      const emailValidation = () => {
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(lemail.match(emailRegex)){
          return true;
        }
        toast.error("Invalid email id", {autoClose:2000});
      };
    
      

      

  return (
    <>

    

    <div className='card-front'>
     <h1>LOGIN</h1>
    <div>
        <center>

        <div className="box">
              <i className='fa fa-envelope icon'></i>
              <input type="email" className='input-box' placeholder='your email id' required
              onChange={(e) => {setLEmail(e.target.value)}}/>
          </div>

          <div className="box">
              <i className='fa fa-key icon'></i>
              <input type="password" className='input-box' placeholder='your password' id='pass1' required
              onChange={(e) => {setLPassword(e.target.value)}}/>

              <div className="icon-eye" onClick={showPassword1}>
                  <i id='eye1' className='fa fa-eye icon'></i>
                  <i id='eye2' className='fa fa-eye-slash icon'></i>
              </div>
          </div>

          <div className="check">
              <input type="checkbox"/><span>Remember me</span>
          </div>

          <button className='btns btn btn-success' onClick={login}>Login</button>

          <div className='links'>
              <Link to="" data-bs-toggle="modal" data-bs-target="#forgetPassModal">Forgot password ?</Link>

              <Link to="" data-bs-toggle="modal" data-bs-target="#adminModal">Admin Login</Link>
          </div> 
        </center>
    </div>

    <div className="flip">
          <a className='register-link' onClick={flip}>I'm new here <i className='fa fa-arrow-right'></i></a>
    </div>

    </div>
    </>
  )
}

export default Login