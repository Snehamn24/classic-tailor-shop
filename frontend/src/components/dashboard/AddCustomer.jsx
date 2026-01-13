import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();

  // Simple state matching form fields
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      

      const response = await axios.post(
        "https://classic-tailor-shop-backend.onrender.com/api/customer/add",
        customer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Customer added successfully");
        navigate("/admin-dashboard/customer");
      }
    } catch (error) {
      alert(
        error.response?.data?.error || "Failed to add customer"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Customer</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded"
          >
            Add Customer
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
