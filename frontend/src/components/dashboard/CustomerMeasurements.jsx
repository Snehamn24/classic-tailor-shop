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

        if (customerRes.data.success) {
          setCustomer(customerRes.data.customer);
        }

        const measurementsRes = await axios.get(
          `https://classic-tailor-shop-backend.onrender.com/api/measurements/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (
          measurementsRes.data.success &&
          measurementsRes.data.measurements
        ) {
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
    if (!window.confirm("Are you sure you want to delete these measurements?"))
      return;

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
      <div className="min-h-screen bg-[#071525] flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071525] px-6 py-10 text-slate-200">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Customer Measurements
          </h1>
          <p className="text-slate-400 mt-1">
            {customer?.name} | {customer?.phone} | {customer?.address}
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1e34] p-6 rounded-2xl border border-slate-700">
            <h2 className="font-semibold text-lg text-blue-400">
              Edit Measurements
            </h2>
            <p className="text-slate-400 mt-1">
              Update shirt and pant measurements
            </p>
          </div>

          <div
            onClick={handleDelete}
            className="bg-[#0b1e34] p-6 rounded-2xl border border-red-700 cursor-pointer hover:bg-red-900/30 transition"
          >
            <h2 className="font-semibold text-lg text-red-400">
              Delete Measurements
            </h2>
            <p className="text-slate-400 mt-1">
              Remove all measurements for this customer
            </p>
          </div>
        </div>

        {/* FORMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SHIRT */}
          <div className="bg-[#0b1e34] p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-bold text-blue-400 mb-4">
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
                  <label className="block text-slate-300 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={measurements[field.name]}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-2 rounded-xl
                      bg-[#071525] border border-slate-600
                      text-slate-200 placeholder-slate-500
                      focus:ring-2 focus:ring-blue-500 outline-none
                    "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PANT */}
          <div className="bg-[#0b1e34] p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">
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
                  <label className="block text-slate-300 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={measurements[field.name]}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-2 rounded-xl
                      bg-[#071525] border border-slate-600
                      text-slate-200 placeholder-slate-500
                      focus:ring-2 focus:ring-emerald-500 outline-none
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/admin-dashboard/customerlist")}
            className="
              px-6 py-3 rounded-xl border border-slate-600
              text-slate-300 hover:bg-slate-700 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="
              px-8 py-3 rounded-xl
              bg-blue-600 text-white
              hover:bg-blue-700 transition
              disabled:opacity-50
            "
          >
            {saving ? "Saving..." : "Save Measurements"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerMeasurements;
