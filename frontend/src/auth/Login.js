import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', info);
      if (response) {
        localStorage.setItem('token', response.data.result.token); 
        localStorage.setItem('isAuth', true); 
        navigate('/facture');
      } else {
        console.log('bad request');
      }
      return response;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div className='container mt-5'>
      <h1>Se connecter</h1>
      <form action="/login" method="post">
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" id="email" placeholder='ecrire votre email' onChange={handleChange} /><br />
        <label htmlFor='password'>Password: </label>
        <input type="password" name="password" id="password" onChange={handleChange}placeholder='ecrire votre mot de passe'/><br />
        <button className='btn btn-primary' type="submit" onClick={handleSubmit}>Log in</button>
        {errors.server && <p className="error">{errors.server}</p>}
      </form>
      <style>{`
         .container {
          width: 500px;
          margin: 10px auto; /* Centrer horizontalement */
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          margin-bottom: 20px;
          text-align: center;
        }
        
        form {
          display: flex;
          flex-direction: column;
        }
        
        label {
          margin-bottom: 8px;
          font-weight: bold;
        }
        
        input {
          padding: 10px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }
        
        input:focus {
          border-color: #007bff;
        }
        
        .error {
          color: red;
          margin-top: 8px;
        }
        
        .btn-primary {
          background-color: #007bff;
          color: #fff;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .btn-primary:hover {
          background-color: #0056b3;
        }
        
        `}</style>
    </div>
  );
};

export default Login;
