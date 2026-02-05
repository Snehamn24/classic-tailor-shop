import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
        navigate('/admin-dashboard', { replace: true });
      } else {
        setError(response?.data?.message || 'Login failed');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || `Server error ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Try again later.');
      } else {
        setError(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071525] flex text-white">
      
      <Navbar />

      <div className="flex-grow flex items-center justify-center pt-20">
        <div className="bg-[#0b223a] w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/10">
          
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-300 mb-6">
            Login to access your dashboard
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-300 bg-red-900/30 border border-red-700 rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-[#071525] border border-white/20
                           px-4 py-2 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg bg-[#071525] border border-white/20
                           px-4 py-2 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2">Remember Me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700
                         text-white font-semibold py-2.5 rounded-lg
                         transition duration-200 shadow-md
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
