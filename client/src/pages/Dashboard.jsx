import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Admin/Modal';

const Dashboard = () => {

  const [user, setUser] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
  },[isModalOpen]);
  
  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user data
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (userId) => {
    const data = {
      userId:userId,
    }
    try {
      const response = axios.post('http://localhost:5000/api/userManage/delete', data);
      setUser(response.data.updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
    <div className='flex-row justify-between items-center'>
        <h1 className='flex justify-center text-5xl font-bold'>Users</h1>
        <div className="p-5">
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item)=> (
              <tr key={item._id}>
                <td className='text-center'>{item.userName}</td>
                <td className='text-center'>{item.role}</td>
                <td className='text-center'><button className='p-2 bg-cyan-500' onClick={()=> handleEditClick(item)}>Edit</button></td>
                <td className='text-center'><button className='p-2 bg-red-500' onClick={()=> handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
        <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} userData={selectedUser} />
    </div>      
    </>
  )
}

export default Dashboard;