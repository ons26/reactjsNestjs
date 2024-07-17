import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import your CSS file for styling
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

const AddUserForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user', { name, age, password });
      message.success('User added successfully');
      console.log('Response from server:', response.data); // Log server response
      onAdd(response.data);
      setName('');
      setAge('');
      setPassword('');
     
    } catch (error) {
      console.error('Error adding user:', error);
      // Check if the error response exists and set the message accordingly
      if (error.response && error.response.data) {
        alert(`Error adding user: ${error.response.data.message || 'Please try again.'}`);
      }
    }
  };

  return (
    <div className="add-user-form-container">
      <form onSubmit={handleSubmit} className="add-user-form">
        <HomeOutlined onClick={() => nav('/userTable')} />
        <h1>Add User</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
