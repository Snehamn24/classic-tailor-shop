import React, { useState } from "react";
import axios from "axios";
import { HiMiniArrowPath } from "react-icons/hi2";

const TrackOrder = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);   
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!phone) {
      setMessage("Please Enter Your Phone Number");
      return;
    }

    try {
      const res = await axios.get(
        `https://classic-tailor-shop-backend.onrender.com/api/orders/track/${phone}`
      );

      if (res.data.success) {
        setOrders(res.data.orders || []);
        setMessage(res.data.message || "");
      }
    } catch (err) {
      setOrders([]);
      setMessage("No orders found for this phone number");
    }
  };

  const handleReset = () => {
  setPhone("");
  setOrders([]);
  setMessage("");
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Track Your Order</h2>
<div className="flex items-center gap-3 justify-center mb-6">
  <input
    type="text"
    placeholder="Enter Your Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="border px-4 py-2 rounded w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    onClick={handleSearch}
   className="
    text-blue-600 bg-neutral-primary border border-blue-600
    hover:bg-blue-600 hover:text-white
    focus:ring-4 focus:ring-blue-200
    font-medium leading-5 rounded-md text-sm px-4 py-2.5
    transition
  "
     
  >
    Track Order
  </button>

  {/* Refresh Button */}
  <button
    onClick={handleReset}
    className="group relative p-2 rounded-full hover:bg-gray-200 transition"
  >
    <HiMiniArrowPath className="h-6 w-6 text-blue-600" />

    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded">
      Refresh
    </span>
  </button>
</div>


      {/* Message */}
      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Orders Table */}
      {orders.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Shirt</th>
                <th className="border p-2">Pant</th>
                <th className="border p-2">Delivery Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border p-2">
                    {order.customerId?.name}
                  </td>
                  <td className="border p-2">
                    {order.customerId?.phone}
                  </td>
                  <td className="border p-2">{order.shirt || 0}</td>
                  <td className="border p-2">{order.pant || 0}</td>
                  <td className="border p-2">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2 font-semibold text-blue-600">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;