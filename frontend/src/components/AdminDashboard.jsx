import React from 'react';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Background */}
      <main className="flex-1 bg-[#F1F7FF] py-6">
        <div className="max-w-7xl mx-auto px-6">
          
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Tailor Dashboard
          </h1>

          <AdminSummary />

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

