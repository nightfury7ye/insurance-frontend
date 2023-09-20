import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { login } from '../../service/Authorization';
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigation = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await login(username, password);
      localStorage.setItem('auth', response.data.accessToken);
      localStorage.setItem("role", response.data.roles[0].rolename)
      localStorage.setItem("username", response.data.user.username)
      let role = response.data.roles[0].rolename
      if (role === "ROLE_ADMIN") {
        navigation(`/admindashboard`)
      } else if (role === "ROLE_CUSTOMER") {
        navigation(`/customerdashboard`)
      } else if (role === "ROLE_EMPLOYEE") {
        navigation(`/employeedashboard`)
      } else if (role === "ROLE_AGENT") {
        navigation(`/agentdashboard`)
      }
    } catch (error) {
      console.error(error);
      alert('Invalid Login Credentials !!!');
    }
  };

  const register = () => {
    navigation('/register')
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-4">
        <div className="card login-card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Insurance Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-4"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <a className="text-primary" onClick={() => register()}>Register as a Customer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
