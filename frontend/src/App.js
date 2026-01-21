import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/dashboard/AdminLayout";
import AdminSummary from "./components/dashboard/AdminSummary";
import AddCustomer from "./components/dashboard/AddCustomer";
import CustomerList from "./components/dashboard/CustomerList";
import UpdateCustomer from "./components/dashboard/UpdateCustomer";
import CustomerMeasurements from "./components/dashboard/CustomerMeasurements";
import AddOrderPage from "./components/dashboard/AddOrders";
import OrderList from "./components/dashboard/OrderList";

function App() {
  return (
    <Routes>

      {/* 🔹 Public Layout (WITH Home Navbar) */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <div className="pt-20">
              <Home />
            </div>
          </>
        }
      />

      {/* 🔹 Login Page (NO Navbar) */}
      <Route path="/login" element={<Login />} />

      {/* 🔹 Admin Layout (NO Home Navbar) */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminSummary />} />
        <Route path="add-customers" element={<AddCustomer />} />
        <Route path="add-orders" element={<AddOrderPage />} />
        <Route path="customerlist" element={<CustomerList />} />
        <Route path="customer/:id/update" element={<UpdateCustomer />} />
        <Route path="customer/:id/measurements" element={<CustomerMeasurements />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="orders" element={<OrderList />}/>
      </Route>

    </Routes>
  );
}

export default App;
