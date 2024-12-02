import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/authSlice';

const LoginPage = () => {

  const [userName, setUserName]= useState('');
  const [userPassword, setUserPassword] = useState();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const response =await axios.post('http://localhost:5000/api/user/login', {userName, userPassword});
      const {token, role} = response.data.data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess({token, role, userName}));
      
      if(role==="client") {
        navigation('/client');
      } else if(role==='admin') {
        navigation('/admin');
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
            userName
          </label>
          <div className="mt-2">
            <input
              id="userName"
              name="userName"
              type="userName"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={userPassword}
              onChange={(e)=>setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      </div>
    </>
    
  )
}

export default LoginPage;
