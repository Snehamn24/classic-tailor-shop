import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerMeasurements = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const [customer, setCustomer] = useState(null);
  const [measurements, setMeasurements] = useState({
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await axios.get(
          `https://classic-tailor-shop-backend.onrender.com/api/customer/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (customerRes.data.success) setCustomer(customerRes.data.customer);

        const measurementsRes = await axios.get(
          `https://classic-tailor-shop-backend.onrender.com/api/measurements/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (measurementsRes.data.success && measurementsRes.data.measurements) {
          setMeasurements(measurementsRes.data.measurements);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({ ...prev, [name]: value }));
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
      alert(err.response?.data?.error || "Failed to save measurements");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete these measurements?")) return;

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
      alert(err.response?.data?.error || "Failed to delete measurements");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Customer Measurements</h1>
        <p className="text-gray-600 mt-1">
          {customer?.name} | {customer?.phone} | {customer?.address}
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow cursor-pointer hover:bg-blue-200">
          <h2 className="font-semibold text-lg text-blue-700">Edit Measurements</h2>
          <p className="text-gray-600 mt-1">Update shirt and pant measurements</p>
        </div>
        <div
          onClick={handleDelete}
          className="bg-red-100 p-6 rounded-lg shadow cursor-pointer hover:bg-red-200"
        >
          <h2 className="font-semibold text-lg text-red-700">Delete Measurements</h2>
          <p className="text-gray-600 mt-1">Remove all measurements for this customer</p>
        </div>
      </div>

      {/* Measurements Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shirt */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Shirt Measurements (in inches)</h2>
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

        {/* Pant */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-green-600 mb-4">Pant Measurements (in inches)</h2>
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

      {/* Save Button */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => navigate("/admin-dashboard/customerlist")}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Measurements"}
        </button>
      </div>
    </div>
  );
};

export default CustomerMeasurements;
