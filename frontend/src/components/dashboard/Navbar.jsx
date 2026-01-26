import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  }
  return (
   <div>
    <div className="flex items-center justify-between">
      
      {/* Clickable Dashboard Heading */}
      <NavLink
        to="/admin-dashboard"
        className="text-2xl font-bold text-blue-600">
      
        Tailor Dashboard
      </NavLink>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  </div>
  )
}

export default Navbar
