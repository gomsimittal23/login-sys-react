import React, { useRef } from 'react';
import './Signin.css';
import { login, signup, useAuth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Signin() {

  const navigate = useNavigate();

  const user = useAuth();

  const passRef = useRef();
  const emailRef = useRef();

  async function handleSignUp(){
    // await signup(emailRef.current.value, passRef.current.value);
    try {
      await signup(emailRef.current.value, passRef.current.value);
      navigate('/');
    } catch {
      alert("Error!");
    }

  }

  async function handleLogIn(){
    // await signup(emailRef.current.value, passRef.current.value);
    try {
      await login(emailRef.current.value, passRef.current.value);
      navigate('/');
    } catch {
      alert("Error!");
    }

  }

  return (
    <div className='container'>
      <h2>Login System</h2>
      <div className='input-contain'>
        <input placeholder='Enter E-mail' ref={emailRef} />
        <input type='password' placeholder='Enter password (min. 6 characters)' ref={passRef} />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogIn}>Already have an account ? Log In </button>
      </div>
    </div>
  )
}