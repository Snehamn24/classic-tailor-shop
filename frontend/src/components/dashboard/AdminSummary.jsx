import React from "react";
import SummaryCard from "./SummaryCard.jsx";

const AdminSummary = () => {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard text="Total Customers" type="customers" />
        <SummaryCard text="Total Orders" type="orders" />
      </div>
    </div>
  );
};

export default AdminSummary;
