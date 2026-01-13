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
      const response = await axios.get(`https://classic-tailor-shop-front.onrender.com/api/customer/${id}`, {
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

  if (loading) return <p>Loading customer data...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Customer</h2>
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
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded"
          >
            Update Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomer;
