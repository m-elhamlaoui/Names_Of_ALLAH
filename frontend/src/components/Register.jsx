import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Register = ({ setUser, questions, setQuestions }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
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
      alert('Registration failed');
    }
  };

  return (
    <div  className="w-full flex flex-col justify-center items-center h-screen bg-ph6 bg-cover bg-center">
    <div className="w-full h-full flex flex-col justify-center items-center border">
    <div className="form-value w-[80%] h-[60%] border flex flex-col justify-center items-center py-6 shadow-md rounded-md bg-white">
      <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center gap-10'>
        <h2 className='text-2xl'>Register</h2>
        <div className="flex flex-col justify-start items-start w-max gap-2">

        <div className="flex flex-row gap-2 justify-start items-center">
          <input type="text" className='border rounded-md w-max' required value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Username</label>
        </div>
        <div className="flex flex-row gap-2 justify-start items-center">
          <input type="password" className='border rounded-md w-max' required value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Password</label>
        </div>
        </div>
        <button type="submit" className='px-4 py-2 rounded-md bg-blue-500 border text-white hover:bg-blue-700'>Register</button>
        <div className="register">
          <p>
            Already have an account
            
            
            ? <a href="/login" className='text-blue-500'>Login</a>
          </p>
        </div>
      </form>
    </div>
  </div>
  </div>

  );
};

export default Register;
