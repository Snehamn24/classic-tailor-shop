import React, { useState } from "react";
import axios from "axios";
import { HiMiniArrowPath } from "react-icons/hi2";
import "./TrackOrder.css";

const TrackOrder = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!phone) {
      setMessage("Please enter your phone number");
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
    <section className="track-section" id="trackorder">
      <div className="track-container">

        {/* Header */}
        <div className="track-header">
          <span className="track-subtitle">Order Status</span>
          <h2 className="track-title">Track Your Order</h2>
          <p className="track-desc">
            Enter your phone number to view your tailoring order status.
          </p>
        </div>

        {/* Search */}
        <div className="track-search">
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={handleSearch} className="track-btn">
            Track Order
          </button>

          <button onClick={handleReset} className="track-reset">
            <HiMiniArrowPath />
            <span>Reset</span>
          </button>
        </div>

        {/* Message */}
        {message && <p className="track-message">{message}</p>}

        {/* Table */}
        {orders.length > 0 && (
          <div className="track-table-wrapper">
            <table className="track-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Shirt</th>
                  <th>Pant</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customerId?.name}</td>
                    <td>{order.customerId?.phone}</td>
                    <td>{order.shirt || 0}</td>
                    <td>{order.pant || 0}</td>
                    <td>
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </td>
                    <td className="status">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};

export default TrackOrder;
