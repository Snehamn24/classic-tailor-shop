import Order from "../models/Order.js";
import Customer from "../models/Customer.js";


// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customerId,
      shirt,
      pant,
      deliveryDate,
      status,
    } = req.body;

    // DEBUG (temporary but IMPORTANT)
    console.log("Incoming Order Payload:", req.body);

    // -------------------------------
    // BASIC VALIDATIONS
    // -------------------------------
    if (!customerId) {
      return res.status(400).json({ success: false, message: "Customer is required" });
    }

    if (shirt === undefined || pant === undefined) {
      return res.status(400).json({
        success: false,
        message: "Shirt and Pant quantities are required",
      });
    }

    if (shirt < 0 || pant < 0) {
      return res.status(400).json({
        success: false,
        message: "Clothing quantities cannot be negative",
      });
    }

    if (!deliveryDate) {
      return res.status(400).json({
        success: false,
        message: "Delivery date is required",
      });
    }

    // -------------------------------
    // DELIVERY DATE VALIDATION
    // -------------------------------
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(deliveryDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: "Delivery date cannot be earlier than today",
      });
    }

    // -------------------------------
    // CREATE ORDER
    // -------------------------------
    const order = new Order({
      customerId,
      shirt,
      pant,
      deliveryDate: selectedDate,
      status,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating order",
    });
  }
};

// ===============================
// GET ALL ORDERS
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// ===============================
// UPDATE ORDER (STATUS / PAYMENT)
// ===============================
export const updateOrder = async (req, res) => {
  try {
    const { status, paymentDone } = req.body;

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (paymentDone !== undefined) updateData.paymentDone = paymentDone;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("customerId", "name phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating order",
    });
  }
};


// TRACK ORDERS BY PHONE
export const trackOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const orders = await Order.find({ customerId: customer._id })
      .populate("customerId", "name phone")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this customer",
      });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Track Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while tracking orders",
    });
  }
};
