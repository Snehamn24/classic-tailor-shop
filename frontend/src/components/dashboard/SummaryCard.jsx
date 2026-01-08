import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SummaryCard = ({ text }) => {
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Fetch total customers from backend
  const fetchTotalCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setNumber(response.data.customers.length);
      }
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  useEffect(() => {
    fetchTotalCustomers();
  }, []);

  const handleClick = () => {
    navigate("/admin-dashboard/customerlist"); // Redirect to CustomerList page
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow rounded p-4 cursor-pointer hover:shadow-lg transition"
    >
      <p className="text-sm text-gray-500">{text}</p>
      <p className="text-2xl font-bold">{number}</p>
    </div>
  );
};

export default SummaryCard;
