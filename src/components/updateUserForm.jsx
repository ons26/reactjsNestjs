import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Confetti from 'react-confetti';
import '../App.css'; // Make sure to import the CSS file

const UpdateUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      form.setFieldsValue(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:5000/user/${id}`, values);
      message.success('User updated successfully');
      setShowConfetti(true); // Show confetti on successful update
      setTimeout(() => {
        navigate('/userTable');
      }, 3000); // Delay navigation to allow confetti to show
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    }
  };

  return (
    <div className="update-user-form-container">
      {showConfetti && <Confetti />}
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ name: '', age: 0, password: '' }}
        className="update-user-form"
      >
        <HomeOutlined onClick={() => navigate('/userTable')}/>
        <h1>Update User</h1>
        
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">Update User</Button>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
