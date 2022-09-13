import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "./App";

function Form() {
  const stateLogin = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(stateLogin)
  
  if (stateLogin.state == false) {
    console.log('why is not directng to login')
    navigate(`/login`)
  }

  const { state } = useLocation();
  const [data, setData] = useState({
    _id: '',
    name: '',
    gender: '',
    age: '',
    password: '',
    isUpdate: false
  })

  const handleInputChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const sendData = async (e) => {
    if (data.name == '' || data.gender == '') {
      return window.alert('Nombre y Número Son Necesarios');
    }

    let response = await fetch('/user/create', {  
      headers:{'Content-Type': 'application/json'},
      method: 'POST', 
      body: JSON.stringify(data) 
    });
    response = await response.json()

    if (response.success) {
      alert('Usuario creado con exito')
    } else {
      alert('Error creado usuario')
    }

    window.location.href = "/list";
  }

  const updateData = async (e) => {
    let response = await fetch('/user/update', {  
      headers:{'Content-Type': 'application/json'},
      method: 'POST', 
      body: JSON.stringify(data) 
    });
    response = await response.json()

    if (response.success) {
      alert('Usuario actualizado con exito')
    } else {
      alert('Error actualizado usuario')
    }

    window.location.href = "/list";
  }
  
  useEffect(() => {
    if (state != null && data.name == '') {
      setData({
        _id: state._id,
        name: state.name,
        gender: state.gender,
        age: state.age,
        password: state.password,
        isUpdate: true
      })
    }
  }); 

  return (
    <div className="min-vh-100 mt-5 mx-10">
      <div className='card d-flex flex-column p-3'>
        <label htmlFor="" className='form-label'>
          Name
          <input type="text" name='name' onChange={handleInputChange} value={data.name} className="form-control"/>
        </label>
        <label htmlFor="" className='form-label'>
          Number
          <input type="number" name='gender' onChange={handleInputChange} value={data.gender} className="form-control"/>
        </label>
        <label htmlFor="" className='form-label'>
          Age
          <input type="number" name='age' onChange={handleInputChange} value={data.age} className="form-control"/>
        </label>
        <label htmlFor="" className='form-label'>
          Password
          <input type="password" name='password' onChange={handleInputChange} value={data.password} className="form-control"/>
        </label>

        {data.isUpdate
          ? <button onClick={updateData} className='btn btn-primary'>Actualizar</button>
          : <button onClick={sendData} className="btn btn-primary">Send</button>
        }

      </div>
    </div>
  );
}

export default Form;
