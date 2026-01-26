import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryCard = ({ text, type }) => {
  const [number, setNumber] = useState(0);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchData = async () => {
    try {
      let url = "";

      if (type === "customers") {
        url = "https://classic-tailor-shop-backend.onrender.com/api/customer";
      } else if (type === "orders") {
        url = "https://classic-tailor-shop-backend.onrender.com/api/orders";
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

  return (
    <>
      <p className="text-sm text-gray-500">{text}</p>
      <p className="text-2xl font-bold text-blue-600 mt-1">
        {number}
      </p>
    </>
  );
};

export default SummaryCard;
