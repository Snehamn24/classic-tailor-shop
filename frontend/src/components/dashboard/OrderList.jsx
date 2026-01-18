import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); 

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://classic-tailor-shop-backend.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch Orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Enum order for sorting
  const statusOrder = ["Not Stitched", "In Progress", "Stitched", "Delivered"];

  // Filter + Sort
  const filteredOrders = (Array.isArray(orders) ? orders : [])
  .filter((order) => {
    const customerName = order.customerId?.name?.toLowerCase() || "";
    const matchesSearch = customerName.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort(
    (a, b) =>
      statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );


// Count of orders by status
const notStitchedCount = orders.filter(order => order.status === "Not Stitched").length;
const inProgressCount = orders.filter(order => order.status === "In Progress").length;



  // Update Order Status or Payment
  const updateOrder = async (id, data) => {
    try {
      const res = await axios.put(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );


      if (res.data.success && res.data.orders) {
  const updatedOrder = res.data.orders;

  setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order._id === updatedOrder._id ? updatedOrder : order
    )
  );
}

      
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      {/* 🔢 Summary Counts */}
<div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold text-slate-700">Not Stitched</h3>
    <p className="text-2xl font-bold text-red-500">{notStitchedCount}</p>
  </div>

  <div className="bg-white shadow rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold text-slate-700">In Progress</h3>
    <p className="text-2xl font-bold text-yellow-500">{inProgressCount}</p>
  </div>
</div>


      {/* Search Customer */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search customer by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-72 focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* 🔘 Status Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["All", "Not Stitched", "In Progress", "Stitched", "Delivered"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}   // ✅ Now defined
              className={`px-4 py-2 rounded ${
                statusFilter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* 📋 Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Shirt</th>
              <th className="border p-2">Pant</th>
              <th className="border p-2">Delivery Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No Orders Found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border p-2">
                    {order.customerId?.name || "N/A"}
                  </td>
                  <td className="border p-2">
                    {order.customerId?.phone}
                  </td>
                  <td className="border p-2">{order.shirt || 0}</td>
                  <td className="border p-2">{order.pant || 0}</td>
                  <td className="border p-2">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </td>

                  {/* 🧵 Status Dropdown */}
                  <td className="border p-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrder(order._id, { status: e.target.value })
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option>Not Stitched</option>
                      <option>In Progress</option>
                      <option>Stitched</option>
                      <option>Delivered</option>
                    </select>
                  </td>

                  {/* 💰 Payment Toggle */}
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        updateOrder(order._id, {
                          paymentDone: !order.paymentDone,
                        })
                      }
                      className={`px-3 py-1 rounded ${
                        order.paymentDone
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.paymentDone ? "Paid" : "Pending"}
                    </button>
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

export default OrderList;
