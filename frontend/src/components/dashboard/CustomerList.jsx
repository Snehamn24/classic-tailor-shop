import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCustomers(res.data.customers);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (id) => {
    console.log("Navigating to update customer with ID:", id);
    navigate(`/admin-dashboard/customer/${id}/update`);
  };

  const handleMeasurements = (id) => {
    console.log("Navigating to measurements for customer ID:", id);
    navigate(`/admin-dashboard/customer/${id}/measurements`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:5000/api/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("Customer deleted successfully");
        fetchCustomers(); // Refresh the list
      }
    } catch (err) {
      console.error("Failed to delete customer:", err);
      alert(err.response?.data?.error || "Failed to delete customer");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer List</h2>

      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg"
          onClick={() => navigate("/admin-dashboard/add-customer")}
        >
          + Add New Customer
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Phone
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Address
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4 text-gray-800">{c.name}</td>
                  <td className="py-3 px-4 text-gray-600">{c.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{c.address || "N/A"}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded transition"
                        onClick={() => handleMeasurements(c._id)}
                        title="Add/View Measurements"
                      >
                         Measurements
                      </button>
                      
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-1.5 px-3 rounded transition"
                        onClick={() => handleUpdate(c._id)}
                        title="Edit Customer Details"
                      >
                         Update
                      </button>
                      
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded transition"
                        onClick={() => handleDelete(c._id)}
                        title="Delete Customer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;