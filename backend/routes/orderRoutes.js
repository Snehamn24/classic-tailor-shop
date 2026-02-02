import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  trackOrdersByPhone,
  deleteOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// TRACK ORDERS (Public)
// Must come before /:id routes
router.get("/orders/track/:phone", trackOrdersByPhone);


// CREATE ORDER (Protected)

router.post("/orders", authMiddleware, createOrder);


// GET ALL ORDERS (Protected)

router.get("/orders", authMiddleware, getAllOrders);


// UPDATE ORDER (Protected)

router.put("/orders/:id", authMiddleware, updateOrder);

// DELETE ORDER (Protected)
router.delete("/orders/:id", authMiddleware, deleteOrder);


export default router;
