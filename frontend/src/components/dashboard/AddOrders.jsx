import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AddOrderPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  

  const [order, setOrder] = useState({
    shirt: 0,
    pant: 0,
    pyjama: 0,
    blazer: 0,
    deliveryDate:"",
    status: "Not Stitched",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCustomers(res.data.customers);
    } catch (err) {
      console.error("Failed to fetch customers", err);
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
    if (!selectedCustomer) {
      alert("Please select a customer");
      return;
    }

    try {
      const payload = {
        customerId: selectedCustomer._id,
        ...order,
      };

      const res = await axios.post("http://localhost:5000/api/orders", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("Order created successfully");
        setSelectedCustomer(null);
        setOrder({ shirt: 0, pant: 0, status: "Not Stitched" });
        navigate("/admin-dashboard/orders");
      }
    } catch (err) {
      console.error("Order save error", err);
      alert(err.response?.data?.error || "Failed to create order");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Order</h1>

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

      {/* Customer List */}
      {!selectedCustomer && (
        <div className="bg-white shadow rounded p-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Customer</h2>
          <div className="max-h-64 overflow-y-auto divide-y">
            {filteredCustomers.map((c) => (
              <div
                key={c._id}
                className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 px-2"
                onClick={() => setSelectedCustomer(c)}
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone}</p>
                </div>
                <button className="border px-3 py-1 rounded">Select</button>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Order Form */}
      {selectedCustomer && (
        <div className="bg-white shadow rounded p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Customer: {selectedCustomer.name}</h2>
            <p className="text-gray-600">{selectedCustomer.phone}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['shirt', 'pant'].map((item) => (
              <div key={item} className="flex items-center justify-between border p-4 rounded-lg">
                <span className="capitalize font-medium">{item}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item, 'dec')}
                    className="border px-3 py-1 rounded"
                  >-
                  </button>
                  <span className="w-6 text-center">{order[item]}</span>
                  <button
                    onClick={() => updateQty(item, 'inc')}
                    className="border px-3 py-1 rounded"
                  >+
                  </button>
                </div>
              </div>

              
            ))}
          </div>

          {/* Status */}

                
      <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Delivery Date
  </label>
  <input
    type="date"
    value={order.deliveryDate}
    onChange={(e) => setOrder({ ...order, deliveryDate: e.target.value })}
    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    required
  />
</div>




          <div className="mt-6">
            <label className="block mb-1 text-gray-700">Order Status</label>
            <select
              value={order.status}
              onChange={(e) => setOrder({ ...order, status: e.target.value })}
              className="border rounded px-4 py-2"
            >
              <option>Not Stitched</option>
              <option>In Progress</option>
              <option>Stitched</option>
              <option>Delivered</option>
            </select>
          </div>

    

          <div className="mt-8 flex justify-end gap-4">
            <button
              className="border px-4 py-2 rounded"
              onClick={() => setSelectedCustomer(null)}
            >
              Cancel
            </button>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Save Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
