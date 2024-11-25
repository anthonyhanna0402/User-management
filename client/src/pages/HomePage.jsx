import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='mt-40 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>Welcome to User Management System</h1>
      <div className='mt-40 block'>
        <Link className="mr-10 border-solid border-black bg-cyan-400 py-1 px-3 rounded-md" to="/login"><button>Login</button></Link>
        <Link className="border-solid border-black bg-cyan-400 py-1 px-3 rounded-md" to="/signup"><button>Signup</button></Link>
      </div>
      
    </div>
  )
}

export default HomePage;