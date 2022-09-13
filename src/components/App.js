import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes , Route, Navigate  } from "react-router-dom";  

import List from './List';
import Form from './Form';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import PageNotFound from './404';

export const AuthContext = React.createContext([1]);

function App() {
  const [loginState, setLoginState] = React.useState(false);

  const handleLogIn = () => {
    setLoginState(true)
  }

  const handleLogout = () => {
    setLoginState(false);
  }

  const value = {
    state: loginState,
    onLogin: handleLogIn,
    onLogout: handleLogout 
  }

  return (
    <AuthContext.Provider value={value}>
      <Router>

        {loginState && (
          <Navbar />
        )}

        {loginState
          ? <Routes>
              <Route index  element={<List/>} />
              <Route path='/list' element={<List/>} />
              <Route path='/form' element={<Form/>}  />
              <Route path='*' element={<PageNotFound/>} />
            </Routes>
          : <Login />
        }

        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;