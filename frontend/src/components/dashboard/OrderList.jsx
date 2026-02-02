import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiFilter, FiDollarSign, FiCheckCircle } from "react-icons/fi";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://classic-tailor-shop-backend.onrender.com/api/orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch Orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusOrder = ["Not Stitched", "In Progress", "Stitched", "Delivered"];

  const filteredOrders = orders
    .filter((order) => {
      const customerName = order.customerId?.name?.toLowerCase() || "";
      const matchesSearch = customerName.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" ? true : order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));

  const updateOrder = async (id, data) => {
    try {
      const res = await axios.put(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.order) {
        setOrders(prev => prev.map(o => o._id === res.data.order._id ? res.data.order : o));
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.delete(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        alert("Order deleted successfully.");
      } else {
        console.error("Unexpected response:", res);
        alert("Failed to delete the order. Please try again.");
      }
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Failed to delete the order. Please try again.");
    }
  };

  const getStatusStyle = (status) => {
    // Dashboard-like soft gradient badges
    const styles = {
      "Not Stitched": "bg-red-100 text-red-700",
      "In Progress": "bg-yellow-100 text-yellow-700",
      "Stitched": "bg-blue-100 text-blue-700",
      "Delivered": "bg-green-100 text-green-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">Orders Dashboard</h1>
          <p className="text-slate-600">Track tailoring orders and manage payments</p>
        </div>
        {/* STATUS SUMMARY CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {/* Not Stitched */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">Not Stitched</p>
      <h2 className="text-3xl font-bold text-red-600">
        {orders.filter(o => o.status === "Not Stitched").length}
      </h2>
    </div>
    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
      <FiFilter size={22} />
    </div>
  </div>

  {/* In Progress */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">In Progress</p>
      <h2 className="text-3xl font-bold text-yellow-600">
        {orders.filter(o => o.status === "In Progress").length}
      </h2>
    </div>
    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
      <FiCheckCircle size={22} />
    </div>
  </div>

  {/* Stitched */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">Stitched</p>
      <h2 className="text-3xl font-bold text-blue-600">
        {orders.filter(o => o.status === "Stitched").length}
      </h2>
    </div>
    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
      <FiCheckCircle size={22} />
    </div>
  </div>

  {/* Delivered */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">Delivered</p>
      <h2 className="text-3xl font-bold text-green-600">
        {orders.filter(o => o.status === "Delivered").length}
      </h2>
    </div>
    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
      <FiDollarSign size={22} />
    </div>
  </div>
</div>


        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center gap-4 mb-12">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {["All", "Not Stitched", "In Progress", "Stitched", "Delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 hover:bg-blue-50 text-slate-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No orders found</div>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  {["Customer", "Phone", "Shirt", "Pant", "Delivery", "Status", "Payment"].map((header) => (
                    <th key={header} className="text-left px-4 py-3 text-slate-700 font-medium text-sm">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-blue-50 transition-all">
                    <td className="px-4 py-3 font-semibold">{order.customerId?.name || "N/A"}</td>
                    <td className="px-4 py-3 text-slate-600">{order.customerId?.phone || "N/A"}</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{order.shirt || 0}</td>
                    <td className="px-4 py-3 font-bold text-indigo-600">{order.pant || 0}</td>
                    <td className="px-4 py-3 text-slate-700">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
    value={order.status}
    onChange={(e) =>
      updateOrder(order._id, { status: e.target.value })
    }
    className={`px-3 py-2 rounded-full text-xs font-semibold border outline-none cursor-pointer ${getStatusStyle(order.status)}`}
  >
    <option value="Not Stitched">Not Stitched</option>
    <option value="In Progress">In Progress</option>
    <option value="Stitched">Stitched</option>
    <option value="Delivered">Delivered</option>
  </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateOrder(order._id, { paymentDone: !order.paymentDone })}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.paymentDone
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.paymentDone ? "Paid" : "Pending"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
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

export default OrderList;
