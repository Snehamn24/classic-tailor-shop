import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // AdminDashboard is now protected by ProtectedRoute which validates token.

  

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-6">
          <AdminSummary />
        </div>
      </main>
    </div>
  )

}

export default AdminDashboard
