import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from "react-router-dom";
import { AuthContext } from "./App";

import Card from './Card';

function List() {
  const state = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (state.state == false) {
    navigate(`/login`)
  }

  const [usersList, setUsersList] = useState([])

  const getData = async () => {
    let response = await fetch("/user/getAll")
        response = await response.json()

    setUsersList(response.response)
  }

  const deleteContact = (id) => {
    setUsersList(usersList.filter((user)=> user._id != id)) 
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="min-vh-100">
      <div className='d-flex flex-column align-items-center gap-2 mt-5'>
        {usersList.map((user, i) => (
          <Card key={i} user={user} deleteContact={deleteContact} />
        ))}
      </div>
    </div>
  );
}

export default List;
