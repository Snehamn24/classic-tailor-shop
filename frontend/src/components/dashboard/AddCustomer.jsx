import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUserPlus, FiArrowLeft } from "react-icons/fi";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(customer.phone))
      newErrors.phone = "Enter valid 10-digit phone";
    if (!customer.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await axios.post(
        "https://classic-tailor-shop-backend.onrender.com/api/customer/add",
        customer,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Customer added successfully!");
        navigate("/admin-dashboard/customerlist");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071525] py-10 px-4 text-white">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition"
          >
            <FiArrowLeft />
            Back
          </button>
        </div>

        <h1 className="text-3xl font-bold text-blue-500 mb-1">
          Add New Customer
        </h1>
        <p className="text-gray-400 mb-8">
          Enter customer details below
        </p>

        {/* FORM CARD */}
        <div className="bg-[#0b223a] rounded-2xl p-6 shadow-lg border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-[#071525] text-white border focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400/40"
                    : "border-white/10 focus:ring-blue-500/40"
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-[#071525] text-white border focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-400/40"
                    : "border-white/10 focus:ring-blue-500/40"
                }`}
                placeholder="10-digit phone number"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-[#071525] text-white border focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "border-red-400 focus:ring-red-400/40"
                    : "border-white/10 focus:ring-blue-500/40"
                }`}
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                py-3
                rounded-xl
                flex items-center justify-center gap-2
                transition-all duration-300
                active:scale-[0.97]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <FiUserPlus className="w-5 h-5" />
              {loading ? "Saving..." : "Add Customer"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
