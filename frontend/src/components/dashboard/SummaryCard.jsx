import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SummaryCard = ({ text, type }) => {
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchData = async () => {
    try {
      let url = "";

      if (type === "customers") {
        url = "http://localhost:5000/api/customer";
      } else if (type === "orders") {
        url = "http://localhost:5000/api/orders";
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        if (type === "customers") {
          setNumber(response.data.customers.length);
        } else if (type === "orders") {
          setNumber(response.data.orders.length);
        }
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    if (type === "customers") {
      navigate("/admin-dashboard/customerlist");
    } else if (type === "orders") {
      navigate("/admin-dashboard/orderlist");
    }
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
