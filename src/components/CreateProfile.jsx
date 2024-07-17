import React, { useState } from 'react';
import axios from 'axios';
import userIcon from './Assets/person.png';
import passwordIcon from './Assets/password.png';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
const nav= useNavigate();
const handleSignup = async () => {
    if (!name || !age || !password) {
        alert('All fields are required');
        return;
    }
    if (!/^[A-Za-z]+$/.test(name)) {
        alert('Name should contain only alphabetic characters');
        return;
    }
    if (!/^[0-9]+$/.test(age)) {
        alert('Age should contain only numbers');
        return;
    }

    try {
        const response = await axios.post('http://localhost:4000/signup', {
            name,
            age,
            password,
        });
        
        // Check if the response contains success message
        if (response.data) {
            alert('User created successfully!');
            // Optionally, navigate to a different page or reset form
            setName('');
            setAge('');
            setPassword('');
        } else {
            alert('Error creating account');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Error creating account. Please try again.');
    }
};


    const handleLogin = async () => {
        if (!name || !password) {
            alert('Name and Password are required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/login', {
                name,
                password,
            });
            if (response.data.success) {
                nav('/categories'); // Navigate to /categories on successful login
            } else {
                alert('Login failed');
            }
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <div className="containerLogin">
            <div className="headerLogin">
                <div className="textLogin">{action}</div>
            </div>
            <div className="inputs">

                        <div className="input">
                            <img src={userIcon} alt="" height='20px' />
                            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                       <div className="input">
                    <img src={passwordIcon} alt="" height='20px' />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {action === "Sign Up" && (
                    <>
                        <div className="input">
                            <img src={userIcon} alt="" height='20px' />
                            <input type="text" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                    </>
                )}
            </div>

            <div className="container-submit">
                <div className="submit" onClick={action === "Login" ? handleLogin : handleSignup}>
                    {action}
                </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
                    {action === "Login" ? "Sign Up" : "Login"}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
