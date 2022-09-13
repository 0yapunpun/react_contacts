
import React, { useState, useContext } from 'react';
import { AuthContext } from "./App";

function Login() {
  const state = useContext(AuthContext);

  const [data, setData] = useState({
    name: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const sendLogin = async (e) => {
    let response = await fetch('/user/login', {  
      headers:{'Content-Type': 'application/json'},
      method: 'POST', 
      body: JSON.stringify(data) 
    });
    response = await response.json(); 

    if (response.success) {
      state.onLogin()
    } else {
      window.alert('usuario o contraseña incorrecta')
    }
  }

  return (
    <div className='min-vh-100 d-flex flex-column h-100 justify-content-center'>
      <h1 className='text-center'>Version modificada</h1>
      <div className="card p-3 gap-2">
        <div className='d-flex gap-2 justify-content-center'>
          <label htmlFor="" className='form-label w-100'>
            Name
            <input type="text" name='name' onChange={handleInputChange} className="form-control"/> 
          </label>
          <label htmlFor="" className='form-label w-100'>
            Password
            <input type="password" name='password' onChange={handleInputChange} className="form-control"/>
          </label>
        </div>
        <button onClick={sendLogin} className='btn btn-primary'>Send</button>
      </div>
    </div>
  );
}

export default Login;
