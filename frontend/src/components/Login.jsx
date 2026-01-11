import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAuth } from '../utils/auth';
//import AdminDashboard from './AdminDashboard';

const Login = () => {
    const [email,setEmail] = useState("");//setEmail is a method to update email state
    const [password,setPassword] = useState("");
    const [error,setError]=useState(null);

    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // When landing on the login page, clear any existing auth tokens.
      // This prevents a user from navigating Back/Forward into a protected page
      // using a previously-stored token without an explicit fresh login.
      clearAuth();
    }, []);

    const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      "https://classic-tailor-shop-backend.onrender.com/api/auth/login",
      { email, password },
      { timeout: 5000 }
    );
    console.log('Login response:', response);

    if (response?.data?.success) {
      const token = response.data.token;
      const user = response.data.user;

      if (rememberMe) {
        localStorage.setItem('token', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        if (user) sessionStorage.setItem('user', JSON.stringify(user));
      }

      setError(null);
      // success alert
      alert('Login successful! Redirecting...');

      // redirect directly to admin dashboard
      navigate('/admin-dashboard', { replace: true });
    } else {
      setError(response?.data?.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      setError(error.response.data?.message || `Server responded with status ${error.response.status}`);
    } else if (error.request) {
      setError('No response from server. Check server/CORS and try again.');
    } else {
      setError(`Request error: ${error.message}`);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div
    className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100
    to-50% space-y-6'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4 flex items-center justify-between'>
            <label htmlFor="email" className='block text-gray-700'>Email </label>
            <input type='email' 
            className='border border-gray-300 rounded-md px-4 py-2 w-full'
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
        </div>
        <div className='mb-4 flex items-center justify-between'>
            <label htmlFor="password" className='block text-gray-700'>Password</label>
            <input type='password' className='border border-gray-300 rounded-md px-4 py-2 w-full' 
            placeholder='Enter a Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />
        </div>

        <div className='mb-4 flex items-center justify-between'>
          <label className='inline-flex items-center'>
            <input type='checkbox' className='form-checkbox' checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)} />
            <span className='ml-2 text-gray-700'>Remember Me</span>
          </label>
          
        </div>
        <div className='mb-4'>
        <button className='bg-teal-600 text-white px-4 py-2 rounded-md' type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        </div>
      </form>
    </div>
  )
}

export default Login
