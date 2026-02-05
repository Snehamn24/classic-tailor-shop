import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiFilter,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

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

  const updateOrder = async (id, data) => {
    try {
      const res = await axios.put(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.order) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === res.data.order._id ? res.data.order : o
          )
        );
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      const res = await axios.delete(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setOrders((prev) =>
          prev.filter((o) => o._id !== id)
        );
      }
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      "Not Stitched":
        "bg-red-900/30 text-red-300 border border-red-700",
      "In Progress":
        "bg-yellow-900/30 text-yellow-300 border border-yellow-700",
      Stitched:
        "bg-blue-900/30 text-blue-300 border border-blue-700",
      Delivered:
        "bg-emerald-900/30 text-emerald-300 border border-emerald-700",
    };
    return styles[status];
  };

  return (
    <div className="min-h-screen bg-[#071525] px-6 py-10 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Orders Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Track tailoring orders and payments
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Not Stitched",
              color: "red",
              count: orders.filter(
                (o) => o.status === "Not Stitched"
              ).length,
              icon: <FiFilter />,
            },
            {
              label: "In Progress",
              color: "yellow",
              count: orders.filter(
                (o) => o.status === "In Progress"
              ).length,
              icon: <FiCheckCircle />,
            },
            {
              label: "Stitched",
              color: "blue",
              count: orders.filter(
                (o) => o.status === "Stitched"
              ).length,
              icon: <FiCheckCircle />,
            },
            {
              label: "Delivered",
              color: "emerald",
              count: orders.filter(
                (o) => o.status === "Delivered"
              ).length,
              icon: <FiDollarSign />,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-[#0b1e34] border border-slate-700 rounded-2xl p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-slate-400 text-sm">
                  {card.label}
                </p>
                <h2 className={`text-3xl font-bold text-${card.color}-400`}>
                  {card.count}
                </h2>
              </div>
              <div
                className={`w-12 h-12 bg-${card.color}-900/30 text-${card.color}-400 rounded-xl flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-[#0b1e34] border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer..."
              className="
                w-full pl-12 pr-4 py-3 rounded-xl
                bg-[#071525] border border-slate-600
                text-slate-200 placeholder-slate-500
                focus:ring-2 focus:ring-blue-500 outline-none
              "
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...statusOrder].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm transition
                  ${
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "border border-slate-600 text-slate-300 hover:bg-slate-700"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#0b1e34] border border-slate-700 rounded-2xl overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              No orders found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#071525]">
                <tr>
                  {[
                    "Customer",
                    "Phone",
                    "Shirt",
                    "Pant",
                    "Delivery",
                    "Status",
                    "Payment",
                    "Delete",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-slate-400 text-sm"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700">
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-[#132c47] transition"
                  >
                    <td className="px-4 py-3 font-semibold">
                      {order.customerId?.name}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {order.customerId?.phone}
                    </td>
                    <td className="px-4 py-3 text-blue-400 font-bold">
                      {order.shirt || 0}
                    </td>
                    <td className="px-4 py-3 text-indigo-400 font-bold">
                      {order.pant || 0}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(
                        order.deliveryDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrder(order._id, {
                            status: e.target.value,
                          })
                        }
                        className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {statusOrder.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          updateOrder(order._id, {
                            paymentDone: !order.paymentDone,
                          })
                        }
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.paymentDone
                            ? "bg-emerald-900/30 text-emerald-300"
                            : "bg-red-900/30 text-red-300"
                        }`}
                      >
                        {order.paymentDone
                          ? "Paid"
                          : "Pending"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="px-3 py-1 rounded-full text-sm bg-red-900/30 text-red-300 hover:bg-red-900/50"
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
