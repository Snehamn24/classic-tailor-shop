import express from "express";
import { createOrder,getAllOrders,updateOrder,trackOrdersByPhone } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//access by phone number should come before id
router.get("/orders/track/:phone",trackOrdersByPhone);

//create order
router.post("/orders",authMiddleware,createOrder);

//get all orders
router.get("/orders",authMiddleware,getAllOrders);

//updation
router.put("/orders/:id",authMiddleware,updateOrder);



export default router;
