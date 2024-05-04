import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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
      if (info.password !== info.repeatPassword) {
        setErrors({ passwordMatch: 'Passwords do not match.' });
        return;
      }
      const response = await axios.post('http://localhost:3000/api/register', info);
      console.log("response", response.data);
      
      if (response) {
        navigate('/facture');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrors({ server: error.response.data.msg });
      } else {
        setErrors({ server: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <>
      <div className='container mt-5'>
        <style>{`
         .container {
          width: 500px;
          margin: 10px auto; /* Centrer horizontalement */
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        form {
          display: flex;
          flex-direction: column;
        }
        
        h1 {
          margin-bottom: 20px;
          text-align: center;
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
        <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>

          <label>Nom </label>
          <input type='text' placeholder='ecrire votre nom' name="username" id="username" onChange={handleChange} required />
          <label>Email</label>
          <input type='text' placeholder='ecrire votre email' name="email" id="email" onChange={handleChange} required />
          <label>Mot de passe </label>
          <input type='password' placeholder='ecrire votre mot de passe' name="password" id="password" onChange={handleChange} required />
          <label>Répéter le mot de passe</label>




<input type='password' placeholder='Reecrire votre mot de passe' name="repeatPassword" id="repeatPassword" onChange={handleChange} required />
          {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
          <button className='btn-primary' type='submit'>Register</button>
          {errors.server && <p className="error">{errors.server}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
