import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiArrowLeft,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

export default function AddOrderPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [order, setOrder] = useState({
    shirt: 0,
    pant: 0,
    deliveryDate: "",
    status: "Not Stitched",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingCustomers, setFetchingCustomers] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setFetchingCustomers(true);
    try {
      const res = await axios.get(
        "https://classic-tailor-shop-backend.onrender.com/api/customer",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setCustomers(res.data.customers);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingCustomers(false);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateQty = (item, type) => {
    setOrder((prev) => ({
      ...prev,
      [item]: type === "inc" ? prev[item] + 1 : Math.max(prev[item] - 1, 0),
    }));
  };

  const handleSubmit = async () => {
    if (!selectedCustomer || !order.deliveryDate) {
      alert("Please complete all required fields");
      return;
    }

    if (order.shirt === 0 && order.pant === 0) {
      alert("Order must contain at least one item.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://classic-tailor-shop-backend.onrender.com/api/orders",
        {
          customerId: selectedCustomer._id,
          ...order,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order created successfully");
      navigate("/admin-dashboard/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071525] px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
          >
            <FiArrowLeft />
            Back
          </button>
          <h1 className="flex-1 text-center text-4xl font-bold text-blue-500">
            Add New Order
          </h1>
        </div>

        {/* CUSTOMER SEARCH */}
        <div className="bg-[#0b223a] border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Select Customer
          </h2>

          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#071525] text-white border border-white/10 focus:ring-2 focus:ring-blue-500/40 outline-none"
            />
          </div>

          {fetchingCustomers ? (
            <p className="text-gray-400">Loading customers...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
              {filteredCustomers.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setSelectedCustomer(c)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300
                    ${
                      selectedCustomer?._id === c._id
                        ? "border-blue-500 bg-blue-600/20"
                        : "border-white/10 bg-[#071525] hover:border-blue-400 hover:bg-blue-600/10 hover:-translate-y-1"
                    }`}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-400">
                        {c.name}
                      </h3>
                      <p className="text-sm text-gray-400">{c.phone}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {c.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ORDER DETAILS */}
        {selectedCustomer && (
          <div className="bg-[#0b223a] border border-white/10 rounded-2xl p-6 mt-10">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold">
                Order Details —
                <span className="text-blue-400"> {selectedCustomer.name}</span>
              </h2>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-xl hover:bg-blue-500/10 transition"
              >
                Change Customer
              </button>
            </div>

            {/* ITEMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {["shirt", "pant"].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center border border-white/10 rounded-xl px-6 py-5"
                >
                  <div>
                    <p className="text-lg font-semibold capitalize">{item}</p>
                    <p className="text-sm text-gray-400">Quantity</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQty(item, "dec")}
                      className="w-9 h-9 rounded-lg border border-white/10 hover:bg-white/10 flex items-center justify-center"
                    >
                      <FiMinus />
                    </button>

                    <span className="text-xl font-bold w-6 text-center">
                      {order[item]}
                    </span>

                    <button
                      onClick={() => updateQty(item, "inc")}
                      className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DATE & STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Delivery Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={order.deliveryDate}
                  onChange={(e) =>
                    setOrder({ ...order, deliveryDate: e.target.value })
                  }
                  className="w-full rounded-xl px-4 py-3 bg-[#071525] text-white border border-white/10 focus:ring-2 focus:ring-blue-500/40 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Order Status
                </label>
                <select
                  value={order.status}
                  onChange={(e) =>
                    setOrder({ ...order, status: e.target.value })
                  }
                  className="w-full rounded-xl px-4 py-3 bg-[#071525] text-white border border-white/10 focus:ring-2 focus:ring-blue-500/40 outline-none"
                >
                  <option>Not Stitched</option>
                  <option>In Progress</option>
                  <option>Stitched</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl transition"
              >
                {loading ? "Creating..." : "Create Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
