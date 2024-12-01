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
  },[user]);
  
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
      {user.map(item=> (
        <div className="px-14">
          <li className='flex' key ={item._id}>
            <p className='p-2'>{}</p>
            <p className='p-2'>{item.userName}</p>
            <p className='p-2'>{item.role}</p>
            <button className='p-2 text' onClick={()=> handleEditClick(item)}>Edit</button>
            <button className='p-2' onClick={()=> handleDelete(item._id)}>Delete</button>

          </li>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} userData={selectedUser} />
    </>
  )
}

export default Dashboard;