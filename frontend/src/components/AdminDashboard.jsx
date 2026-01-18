import React from 'react';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Admin Dashboard
          </h1>

          {/* Summary Cards + Sidebar Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Sidebar as part of Summary */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
              <ul className="space-y-2 text-slate-700">
                <li className="hover:text-blue-600 cursor-pointer">Users</li>
                <li className="hover:text-blue-600 cursor-pointer">Books</li>
                <li className="hover:text-blue-600 cursor-pointer">Fines</li>
                <li className="hover:text-blue-600 cursor-pointer">Reports</li>
              </ul>
            </div>

            {/* Admin Summary Cards */}
            <AdminSummary />

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
