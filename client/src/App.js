import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react'
import './App.css';
import store from './app/Store';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/register" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />}>
          </Routes>
        </Router>
      </Provider>      
    </>
  );
}

export default App;
