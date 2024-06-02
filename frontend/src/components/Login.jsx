import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './style1.css';

const Login = ({ setUser, questions, setQuestions }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token && data.questions) {
      const decodedToken = jwtDecode(data.token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      localStorage.setItem('token', data.token);
      setQuestions(data.questions)
      setUser(decodedToken);
      navigate('/quiz');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div  className="w-full flex flex-col justify-center items-center h-screen bg-ph6 bg-cover bg-center">
      <section>

      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center gap-10'>
            <h2 className='text-2xl'>Login</h2>
            <div className="flex flex-col justify-start items-start w-max gap-2">

            <div className="inputbox">
              <input type="text" className='border rounded-md w-max' required value={username} onChange={(e) => setUsername(e.target.value)} />
              <label>Username</label>
            </div>
            <div className="inputbox">
              <input type="password" className='border rounded-md w-max' required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            </div>
            <button type="submit" className='px-4 py-2 rounded-md bg-blue-500 border text-white hover:bg-blue-700'>Log in</button>
            <div className="register">
              <p>
                Don't have an account? <a href="/register" className='text-blue-500'>Register</a>
              </p>
            </div>
          </form>
        </div>
        </div>
        </section>
      </div>
      

  );
};

export default Login;
