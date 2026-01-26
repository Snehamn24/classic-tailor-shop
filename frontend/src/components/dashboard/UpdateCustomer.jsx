import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomer = () => {
  const { id } = useParams(); // Get customer ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch customer details on page load
  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`https://classic-tailor-shop-backend.onrender.com/api/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCustomer(response.data.customer);
      }
    } catch (err) {
      console.error("Failed to fetch customer:", err);
      alert("Failed to load customer data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://classic-tailor-shop-backend.onrender.com/api/customer/${id}`,
        customer,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Customer updated successfully");
        navigate("/admin-dashboard/customerlist");
      }
    } catch (err) {
      console.error("Failed to update customer:", err);
      alert(err.response?.data?.error || "Failed to update customer");
    }
  };

  if (loading) return <p className="text-center py-20 text-slate-500">Loading customer data...</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Update Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Address</label>
              <input
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2 border border-blue-400 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
>
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
