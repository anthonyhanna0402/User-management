import React, { useState, useEffect } from 'react';
import Header from '../components/Customer/Layout/Header';
import axios from 'axios';

const ClientPage = () => {

  const [users, setUsers] = useState([]); 

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/getusers');

      if(response.data&&response.data.users) {
        setUsers(response.data.users);
        console.log(users);
          
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
    <Header />
      {users.map(item=> (
        <div className="px-14">
          <li className='flex' key ={item._id}>
            <p className='p-2'>{}</p>
            <p className='p-2'>{item.userName}</p>
            <p className='p-2'>{item.role}</p>
          </li>
        </div>
      ))}
    </>
  )
}

export default ClientPage;