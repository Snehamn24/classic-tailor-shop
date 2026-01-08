import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { 
  addCustomer, 
  getCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer 
} from "../controllers/customerController.js";

const customerRouter = express.Router();

// Add new customer
customerRouter.post("/add", authMiddleware, addCustomer);

// Get all customers
customerRouter.get("/", authMiddleware, getCustomers);

// Get customer by ID
customerRouter.get("/:id", authMiddleware, getCustomerById);

// Update customer by ID
customerRouter.put("/:id", authMiddleware, updateCustomer);

// Delete customer by ID
customerRouter.delete("/:id", authMiddleware, deleteCustomer);

export default customerRouter;