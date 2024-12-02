import React, { useState, useEffect } from 'react';
import Header from '../components/Customer/Layout/Header';
import axios from 'axios';

const ClientPage = () => {

  const [users, setUsers] = useState([]); 

  const getUsers = async () => {
    try {
      const token = localStorage.getItem(token);
      console.log('token',token);
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
    <h1 className='flex justify-center text-5xl font-bold'>Users</h1>

    <div className='flex justify-between items-center'>
        <div className="p-5">
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item)=> (
              <tr key={item._id}>
                <td className='text-center'>{item.userName}</td>
                <td className='text-center'>{item.role}</td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
    </div>      
    </>
  )
}

export default ClientPage;