import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Category from './components/Category';
import Couffin from './components/Couffin';
import Poetrie from './components/Poetrie';
import CreateProfile from './components/CreateProfile';
import UserTable from './components/userTable';
import UpdateUser from './components/updateUserForm'; // Assuming this is the correct component name
import AddUser from './components/addUserForm'; // Corrected import

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<CreateProfile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserTable" element={<UserTable />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/AddUser" element={<AddUser />} /> {/* Corrected component name */}
        <Route path="/categories" element={<Category />} />
        <Route path="/couffin" element={<Couffin />} />
        <Route path="/poetrie" element={<Poetrie />} />
      </Routes>
    </Router>
  );
}

export default App;
