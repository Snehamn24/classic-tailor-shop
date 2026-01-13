import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerMeasurements = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const [customer, setCustomer] = useState(null);
  const [measurements, setMeasurements] = useState({
    // Shirt Measurements
    shirtLength: "",
    shirtChest: "",
    shirtWaist: "",
    shirtShoulder: "",
    shirtSleeve: "",
    
    // Pant Measurements
    pantLength: "",
    pantWaist: "",
    pantHip: "",
    pantThigh: "",
    pantBottom: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch customer details and measurements
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer info
        const customerRes = await axios.get(`https://classic-tailor-shop-backend.onrender.com/api/customer/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (customerRes.data.success) {
          setCustomer(customerRes.data.customer);
        }

        // Fetch existing measurements
        try {
          const measurementsRes = await axios.get(`https://classic-tailor-shop-backend.onrender.com/api/measurements/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (measurementsRes.data.success && measurementsRes.data.measurements) {
            setMeasurements(measurementsRes.data.measurements);
          }
        } catch (err) {
          console.log("No existing measurements found - starting fresh");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        alert("Failed to load customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.post(
        `https://classic-tailor-shop-backend.onrender.com/api/measurements/${id}`,
        measurements,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Measurements saved successfully!");
        navigate("/admin-dashboard/customerlist");
      }
    } catch (err) {
      console.error("Failed to save measurements:", err);
      alert(err.response?.data?.error || "Failed to save measurements");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete these measurements?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://classic-tailor-shop-backend.onrender.com/api/measurements/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Measurements deleted successfully!");
        setMeasurements({
          shirtLength: "",
          shirtChest: "",
          shirtWaist: "",
          shirtShoulder: "",
          shirtSleeve: "",
          pantLength: "",
          pantWaist: "",
          pantHip: "",
          pantThigh: "",
          pantBottom: "",
        });
      }
    } catch (err) {
      console.error("Failed to delete measurements:", err);
      alert(err.response?.data?.error || "Failed to delete measurements");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Measurements for {customer?.name}
        </h1>
        <p className="text-gray-600 mt-1">
          Phone: {customer?.phone} | Address: {customer?.address}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Shirt Measurements */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Shirt Measurements (in inches)
            </h2>
            
            <div className="space-y-4">
              {[
                { label: "Shirt Length", name: "shirtLength" },
                { label: "Chest", name: "shirtChest" },
                { label: "Waist", name: "shirtWaist" },
                { label: "Shoulder", name: "shirtShoulder" },
                { label: "Sleeve", name: "shirtSleeve" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={measurements[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pant Measurements */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Pant Measurements (in inches)
            </h2>
            
            <div className="space-y-4">
              {[
                { label: "Pant Length", name: "pantLength" },
                { label: "Waist", name: "pantWaist" },
                { label: "Hip", name: "pantHip" },
                { label: "Thigh", name: "pantThigh" },
                { label: "Bottom", name: "pantBottom" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={measurements[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <div>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Measurements
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/customerlist")}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              {saving ? "Saving..." : "Save Measurements"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerMeasurements;