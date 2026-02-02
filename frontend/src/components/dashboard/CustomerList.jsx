import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUserPlus, FiEdit3, FiTool, FiTrash2, FiUser } from "react-icons/fi";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://classic-tailor-shop-backend.onrender.com/api/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCustomers(res.data.customers);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (id) => {
    navigate(`/admin-dashboard/customer/${id}/update`);
  };

  const handleMeasurements = (id) => {
    navigate(`/admin-dashboard/customer/${id}/measurements`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await axios.delete(`https://classic-tailor-shop-backend.onrender.com/api/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setCustomers(prev => prev.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete customer:", err);
      alert(err.response?.data?.error || "Failed to delete customer");
    } finally {
      setDeletingId(null);
    }
  };

   return (
    <div className="min-h-screen px-6 py-8 bg-blue-50">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Customers
          </h1>
          <p className="text-slate-500 mt-1">
            Manage customer records and measurements
          </p>
        </div>

        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-sm">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by customer name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <button
              onClick={() => navigate("/admin-dashboard/add-customers")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              <FiUserPlus />
              Add Customer
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-slate-500">
              Loading customers...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-16 text-center">
              <FiUser className="mx-auto w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-500">
                No customers found
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-100 border-b">
                <tr>
                  {["Name", "Phone", "Address", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-sm font-semibold text-slate-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredCustomers.map((c) => (
                  <tr key={c._id} className="transition-all duration-300 hover:bg-blue-50 hover:translate-y-[-2px] hover:shadow-md">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                          <FiUser className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {c.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            ID: {c._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono text-slate-700">
                      {c.phone}
                    </td>

                    <td className="px-6 py-4 text-slate-600 max-w-sm">
                      {c.address || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin-dashboard/customer/${c._id}/measurements`
                            )
                          }
                          className="px-4 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-sm flex items-center gap-1"
                        >
                          <FiTool />
                          Measurements
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/admin-dashboard/customer/${c._id}/update`
                            )
                          }
                          className="px-4 py-2 rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm flex items-center gap-1"
                        >
                          <FiEdit3 />
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(c._id)}
                          disabled={deletingId === c._id}
                          className="px-4 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-sm flex items-center gap-1 disabled:opacity-50"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;