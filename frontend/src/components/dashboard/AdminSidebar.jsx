import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='w-64 h-screen bg-blue-50 text-black p-4'>
       

        <nav className="mt-6 space-y-2">
          <NavLink to="/admin-dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</NavLink>
          <NavLink to="/admin-dashboard/add-customers" className="block py-2 px-3 rounded hover:bg-gray-700">Add Customer</NavLink>
          <NavLink to="/admin-dashboard/add-orders" className="block py-2 px-3 rounded hover:bg-gray-700">Add Order</NavLink>
        </nav>
      
    </div>
  )
}

export default AdminSidebar
