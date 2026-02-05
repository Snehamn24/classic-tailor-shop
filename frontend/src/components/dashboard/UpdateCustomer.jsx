import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `https://classic-tailor-shop-backend.onrender.com/api/customer/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071525] flex items-center justify-center">
        <p className="text-slate-300 text-lg">Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071525] flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-[#0b1f36] text-slate-100 rounded-2xl shadow-xl p-10">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
          Update Customer
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#071525] border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#071525] border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#071525] border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin-dashboard/customerlist")}
                className="px-6 py-2 rounded-lg border border-slate-500 text-slate-300 hover:bg-[#102a4c]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Update Customer
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
