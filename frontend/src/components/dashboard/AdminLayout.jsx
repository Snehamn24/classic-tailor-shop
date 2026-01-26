import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <Navbar />
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
