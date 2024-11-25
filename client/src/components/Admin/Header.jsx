import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/authSlice';

const Header = () => {
  const dispatch= useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector(state=>state.auth.userName);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigation('/');
  };

  return(
    <React.Fragment>
      <div>
      <div className="container mx-auto flex justify-between items-center px-20 py-8">
          <button><h1 className='text-cyan-400 text-3xl font-bold'>User Management System</h1></button>
          <button className="xl:hidden text-white focus:outline-none" id="menu-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="hidden xl:flex">
          <div class="hidden xl:flex xl:items-center">
            <Link to="/admin" className='text-2xl mr-6'>Home</Link>
            <Link to="/add" className='text-2xl mr-6'>Add</Link>
            <Link to="/about" className='text-2xl mr-12'>About</Link>
          </div>
            <p className='mr-5'>{currentUser}</p>
            <button onClick={handleLogout}>SignOut</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header;
