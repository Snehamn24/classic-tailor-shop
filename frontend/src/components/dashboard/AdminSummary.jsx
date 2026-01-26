import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import SummaryCard from "./SummaryCard.jsx";
import { HiUserAdd } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { GiClothes } from "react-icons/gi";

const AdminSummary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-8 lg:px-10">
      
      {/* PAGE TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-600 mb-3">
          Dashboard Overview
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Manage customers and orders with ease
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        
        {/* ADD CUSTOMER */}
        <button
          onClick={() => navigate("add-customers")}
          className="group relative
  bg-white
  rounded-2xl
  p-6
  border border-blue-100
  shadow-sm
  transition-all duration-300 ease-out
  transform-gpu
  hover:-translate-y-1
  hover:scale-[1.02]
  hover:bg-blue-100
  hover:border-blue-200
  hover:shadow-lg
  active:scale-[0.98]
  active:bg-blue-200
  text-left"
>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <HiUserAdd className="text-blue-600 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Add Customer
          </h3>
          <p className="text-slate-500 text-sm">
            Register a new customer
          </p>
        </button>

        {/* ADD ORDER */}
        <button
          onClick={() => navigate("add-orders")}
          className="group relative
  bg-white
  rounded-2xl
  p-6
  border border-blue-100
  shadow-sm
  transition-all duration-300 ease-out
  transform-gpu
  hover:-translate-y-1
  hover:scale-[1.02]
  hover:bg-blue-100
  hover:border-blue-200
  hover:shadow-lg
  active:scale-[0.98]
  active:bg-blue-200
  text-left"

        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
             <FiShoppingBag className="text-blue-600 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Add Order
          </h3>
          <p className="text-slate-500 text-sm">
            Create a new tailoring order
          </p>
        </button>
      </div>

      {/* SUMMARY SECTION */}
      <div>
        <h3 className="text-2xl font-bold text-blue-600 mb-1">
          Quick Summary
        </h3>
        <p className="text-slate-500 mb-8">
          At a glance statistics
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TOTAL CUSTOMERS */}
           <div
            onClick={() => navigate("customerlist")}
           className="group relative
  bg-white
  rounded-2xl
  p-6
  border border-blue-100
  shadow-sm
  transition-all duration-300 ease-out
  transform-gpu
  hover:-translate-y-1
  hover:scale-[1.02]
  hover:bg-blue-100
  hover:border-blue-200
  hover:shadow-lg
  active:scale-[0.98]
  active:bg-blue-200
  text-left"

          >
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
             <HiUsers className="text-blue-600 w-5 h-5" />
          </div>
            <SummaryCard
            
              text="Total Customers"
              type="customers"
              className="p-6 rounded-xl bg-[#F1F7FF]"
            />
          </div>
         

          {/* TOTAL ORDERS */}
          <div
            onClick={() => navigate("orderlist")}
            className="cursor-pointer
    bg-white
    rounded-2xl
    p-6
    border border-blue-100
    shadow-sm
    transition-all duration-300 ease-out
    transform-gpu
    hover:-translate-y-1
  hover:scale-[1.02]
  hover:bg-blue-100
  hover:border-blue-200
  hover:shadow-lg
  active:scale-[0.98]
  active:bg-blue-200
    text-left"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
             <GiClothes className="text-blue-600 w-5 h-5" />
          </div>
            
            <SummaryCard
              text="Total Orders"
              type="orders"
              className="p-6 rounded-xl bg-[#F1F7FF]"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
