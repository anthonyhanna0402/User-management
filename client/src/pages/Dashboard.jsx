import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

  const [user, setUser] = useState([]); 

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/getusers');
      console.log(response.data.users);
      if(response.data&&response.data.users) {
        setUser(response.data.users);
        console.log('user', user);
          
      } else {
        console.log("no data");
      }
  
    } catch(error) {
      console.log('error fetching', error);
    }
  }

  useEffect(()=>{
    getUsers();
  },[]);

  return (
    <>
      {user.map(item=> (
        <div className="px-14">
          <li className='flex' key ={item._id}>
            <p className='p-2'>{}</p>
            <p className='p-2'>{item.userName}</p>
            <p className='p-2'>{item.role}</p>
            <button className='p-2 text'>Edit</button>
            <button className='p-2'>Delete</button>
          </li>
        </div>
      ))}
    </>
  )
}

export default Dashboard;