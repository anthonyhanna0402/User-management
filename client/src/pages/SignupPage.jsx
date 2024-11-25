import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const navigation = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [role, setRole] = useState('client'); // Default role
  console.log('userName',userName);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:5000/api/user/signup', { userName, userPassword, role });
          alert('User created successfully');
          navigation('/login');
          setUserName('');
          setUserPassword('');
      } catch (error) {
          console.error('Signup failed', error);
      }
  };

  return (
    <>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign up 
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
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={userPassword}
              onChange={(e)=>setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="client">Client</option>
                <option value="admin">Administrator</option>
            </select>      
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>
      </div>
    </>
      
  );
};

export default SignupPage;
