import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, userData }) => {
 
  
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  useEffect(()=> {
    if(userData) {
      setUserName(userData.userName);
      setRole(userData.role);
    }
  },[userData]);


  const handleSave = async (e) => {
    
    e.preventDefault();

    const data = {
      userId:userData._id, 
      userName:userName,
      role:role,
    }

    try {
      const response = await axios.post('http://localhost:5000/api/userManage/edit', data);

    } catch (error) {
      console.log(error);
    }
  }

  console.log('role', role);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mb-4">
          <form>
            <label className='block mb-2'>
              Email:
              <input
                type='text'
                className='block w-full p-2 border rounded mt-1'
                placeholder='Enter your Name'
                value={userName}
                onChange={(e)=> setUserName(e.target.value)}
              />
            </label>
            <label className='block mb-2'>
              Role:
              <select 
                value={role}
                onChange={(e)=>setRole(e.target.value)}
              >
                <option value="client">Client</option>
                <option value="Admin">Administrator</option>
              </select>
            </label>
          </form>

        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;