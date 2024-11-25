import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/SignupPage';
import ClientPage from './pages/ClientPage';
import AdminPage from './pages/AdminPage';
import AddPage from './pages/AddPage';
import store from './redux/store';
import {Provider} from 'react-redux'

import './App.css';

const App = () => {

  return (
    <React.Fragment>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/client' element={<ClientPage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/add' element={<AddPage />} />
          </Routes>        
        </Router>
      </Provider>           
    </React.Fragment>
  );
}

export default App;
