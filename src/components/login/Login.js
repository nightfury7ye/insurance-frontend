import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { login } from '../../service/Authorization';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  let navigation = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    try {
      const response = await login(username, password)
        console.log(response);
        localStorage.setItem('auth', response.data.accessToken);
        localStorage.setItem("role", response.data.roles[0].rolename)
        localStorage.setItem("username", response.data.user.username)
        let role = response.data.roles[0].rolename
        if(role == "ROLE_ADMIN"){
            navigation(`/admindashboard`)
        }else if(role == "ROLE_CUSTOMER"){
        navigation(`/customerdashboard`)
        console.log("After User navigate");
        }else if(role == "ROLE_EMPLOYEE"){
          navigation(`/employeedashboard`)
          console.log("After User navigate");
        }else if(role == "ROLE_AGENT"){
          navigation(`/agentdashboard`)
          console.log("After User navigate");
        }
        alert('Login Successfull !!!', response.result);
        console.log(response);
    } catch (error) {
      console.log(error);
      alert('Invalid Login Credentials !!!');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-3">
        <div className="card login-card" style={{ width: '50vh' }}>
          <div className="card-body">
            <h3 className="card-title">Login</h3>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="customer">Customer</option>
                <option value="employee">Employee</option>
              </select>
            </div> */}
            <button
              className="btn btn-primary mt-3"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
