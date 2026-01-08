import React from 'react'
import SummaryCard from './SummaryCard'

const AdminSummary = () => {
  return (
    
    <div>
        <h2>Dashboard Overview</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <SummaryCard text="Total Customers" />
            <SummaryCard text="Total Orders" number={20} />
        </div>
     </div>
  )
}

export default AdminSummary
