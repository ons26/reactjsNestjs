import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { EditOutlined, DeleteOutlined, SearchOutlined, UserOutlined, RetweetOutlined, FilePdfOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserPDF from './pdf';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize, sortColumn, sortOrder]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        params: {
          page: currentPage,
          limit: pageSize,
          sortColumn,
          sortOrder,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const maskPassword = (password) => '*'.repeat(password.length);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteUser = async (userId) => {
    Modal.confirm({
      title: 'Are you sure delete this user?',
      content: '.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/user/${userId}`);
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
          message.success('User deleted successfully');
        } catch (error) {
          console.error('Error deleting user:', error);
          message.error('Failed to delete user');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
    if (sortColumn === 'name') {
      return sortOrderFactor * a.name.localeCompare(b.name);
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortColumn === 'name' && sortOrder,
      sortDirections: ['ascend', 'descend'],
      render: (text) => text,
      onHeaderCell: () => ({
        onClick: () => handleSort('name'),
      }),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text) => maskPassword(text),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => nav(`/updateUser/${record._id}`)}>Edit</Button>
          <Button icon={<DeleteOutlined />} onClick={() => deleteUser(record._id)} type="danger">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="users-list-container">
      <h1><UserOutlined /> Users List</h1>
      <Input
        className="search-bar"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
      />
      <RetweetOutlined onClick={() => handleSort('name')} style={{ marginLeft: 16 }} />
      <PDFDownloadLink document={<UserPDF users={filteredUsers} />} fileName="users.pdf">
        <Button icon={<FilePdfOutlined />} style={{ marginLeft: 16 }}>
          Download PDF
        </Button>
      </PDFDownloadLink>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: users.length,
        }}
        onChange={handleTableChange}
      />
      <Button onClick={() => nav('/AddUser')}>Add</Button>
    </div>
  );
};

export default UserTable;
