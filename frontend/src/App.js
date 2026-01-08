import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminSummary from "./components/dashboard/AdminSummary";
import AdminDashboard from "./components/AdminDashboard";
import AdminLayout from "./components/dashboard/AdminLayout";
import AddCustomer from "./components/dashboard/AddCustomer";
import CustomerList from "./components/dashboard/CustomerList";
import UpdateCustomer from "./components/dashboard/UpdateCustomer";
import CustomerMeasurements from "./components/dashboard/CustomerMeasurements";
import AddOrderPage from "./components/dashboard/AddOrders";


function App() {
  return (
    <>
      <Navbar />

      {/* padding-top because navbar is fixed */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* later */}
          <Route path="/login" element={<Login />} />
           
           <Route path="/admin-dashboard" element={
        <ProtectedRoute>
           <AdminLayout />

          
        </ProtectedRoute>
      }>
         <Route index element={<AdminSummary />} />
         <Route
        path="add-customers"
        element={<AddCustomer />}/>
         <Route path="add-orders" element={<AddOrderPage />}/>

        <Route path="customerlist" element={<CustomerList />}/>
        <Route
  path="customer/:id/update"
  element={<UpdateCustomer />}
/>

  <Route path="customer/:id/measurements" element={<CustomerMeasurements />} />

      </Route>


        </Routes>
      </div>
    </>
  );
}

export default App;
