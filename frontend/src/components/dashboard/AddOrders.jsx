import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiCalendar,
  FiCheckCircle,
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
      alert("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl transition"
          >
            <FiArrowLeft />
            Back
          </button>
          <h1 className="flex-1 text-center text-4xl font-bold text-blue-600">
            Add New Order
          </h1>
        </div>

        {/* CUSTOMER SEARCH */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Customer
          </h2>

          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {fetchingCustomers ? (
            <p className="text-gray-500">Loading customers...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
              {filteredCustomers.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setSelectedCustomer(c)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300
                    ${
                      selectedCustomer?._id === c._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-blue-100 bg-white hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md"
                    }`}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <FiUser className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-600">
                          {c.name}
                        </h3>
                        <p className="text-sm text-gray-600">{c.phone}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {c.address}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full h-fit">
                      Select
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       {/* ORDER DETAILS */}
{selectedCustomer && (
  <div className="bg-white border border-blue-100 rounded-2xl p-6 mt-10">
    
    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Order Details
        <span className="text-blue-600 font-medium">
          {" "}— {selectedCustomer.name}
        </span>
      </h2>

      <button
        onClick={() => setSelectedCustomer(null)}
        className="border border-blue-300 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
      >
        Change Customer
      </button>
    </div>

    {/* ITEMS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {["shirt", "pant"].map((item) => (
        <div
          key={item}
          className="flex justify-between items-center border border-blue-100 rounded-xl px-6 py-5"
        >
          <div>
            <p className="text-lg font-semibold capitalize">{item}</p>
            <p className="text-sm text-gray-500">Quantity</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => updateQty(item, "dec")}
              className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100"
            >
              <FiMinus />
            </button>

            <span className="text-xl font-bold w-6 text-center">
              {order[item]}
            </span>

            <button
              onClick={() => updateQty(item, "inc")}
              className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
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
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Delivery Date
        </label>
        <input
          type="date"
          value={order.deliveryDate}
          onChange={(e) =>
            setOrder({ ...order, deliveryDate: e.target.value })
          }
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Order Status
        </label>
        <select
          value={order.status}
          onChange={(e) =>
            setOrder({ ...order, status: e.target.value })
          }
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none"
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
        className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
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
