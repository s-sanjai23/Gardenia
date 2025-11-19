import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const switchModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    if (isLogin) {
      try {
        await login({ email, password });
        navigate('/'); // Navigate to home page after login
      } catch (error) {
        console.error('Failed to login:', error);
        // Here you could update the state to show an error message to the user
      }
    } else {
      try {
        await register({ name, email, password });
        navigate('/'); // Navigate to home page after signup
      } catch (error) {
        console.error('Failed to sign up:', error);
        // Here you could update the state to show an error message to the user
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          </div>
        </form>
        <button onClick={switchModeHandler} className="switch-button">
          {isLogin ? "Don't have an account? Sign Up" : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
