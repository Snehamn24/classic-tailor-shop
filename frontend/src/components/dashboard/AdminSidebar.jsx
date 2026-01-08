import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='w-64 h-screen bg-gray-800 text-white p-4'>
        <div>
            <h2>EMPLOYEE MS</h2>
        </div>

        <nav className="mt-6 space-y-2">
          <NavLink to="/admin-dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</NavLink>
          <NavLink to="/admin-dashboard/add-customers" className="block py-2 px-3 rounded hover:bg-gray-700">Add Customer</NavLink>
          <NavLink to="/admin-dashboard/add-orders" className="block py-2 px-3 rounded hover:bg-gray-700">Add Order</NavLink>
          <NavLink to="/admin-dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Leave</NavLink>
          <NavLink to="/admin-dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Salary</NavLink>
        </nav>
      
    </div>
  )
}

export default AdminSidebar
