import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // ===============================
  // FETCH ORDERS
  // ===============================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://classic-tailor-shop-backend.onrender.com/api/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

  // ===============================
  // FILTER + SORT
  // ===============================
  const statusOrder = [
    "Not Stitched",
    "In Progress",
    "Stitched",
    "Delivered",
  ];

  const filteredOrders = orders
    .filter((order) => {
      const customerName =
        order.customerId?.name?.toLowerCase() || "";
      const matchesSearch = customerName.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        statusOrder.indexOf(a.status) -
        statusOrder.indexOf(b.status)
    );

  // ===============================
  // COUNTS
  // ===============================
  const notStitchedCount = orders.filter(
    (o) => o.status === "Not Stitched"
  ).length;

  const inProgressCount = orders.filter(
    (o) => o.status === "In Progress"
  ).length;

  // ===============================
  // UPDATE ORDER
  // ===============================
  const updateOrder = async (id, data) => {
    try {
      const res = await axios.put(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success && res.data.order) {
        const updatedOrder = res.data.order;

        setOrders((prev) =>
          prev.map((o) =>
            o._id === updatedOrder._id ? updatedOrder : o
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

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">
            Not Stitched
          </h3>
          <p className="text-2xl font-bold text-red-500">
            {notStitchedCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">
            In Progress
          </h3>
          <p className="text-2xl font-bold text-yellow-500">
            {inProgressCount}
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customer by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-72"
        />
      </div>

      {/* STATUS FILTER */}
      <div className="flex gap-2 mb-4">
        {[
          "All",
          "Not Stitched",
          "In Progress",
          "Stitched",
          "Delivered",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Shirt</th>
              <th className="border p-2">Pant</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Orders Found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border p-2">
                    {order.customerId?.name}
                  </td>
                  <td className="border p-2">
                    {order.customerId?.phone}
                  </td>
                  <td className="border p-2">{order.shirt}</td>
                  <td className="border p-2">{order.pant}</td>
                  <td className="border p-2">
                    {new Date(
                      order.deliveryDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrder(order._id, {
                          status: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option>Not Stitched</option>
                      <option>In Progress</option>
                      <option>Stitched</option>
                      <option>Delivered</option>
                    </select>
                  </td>

                  <td className="border p-2">
                    <button
                      onClick={() =>
                        updateOrder(order._id, {
                          paymentDone: !order.paymentDone,
                        })
                      }
                      className={`px-3 py-1 rounded text-white ${
                        order.paymentDone
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.paymentDone
                        ? "Paid"
                        : "Pending"}
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
