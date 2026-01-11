import Order from "../models/Order.js";
import Customer from "../models/Customer.js";

//Create new order
//take the incoming variable values from the frontend and store it in a variable so we can use it
export const createOrder = async(req,res)=>{
    try{
        const{
            customerId,
            shirt,
            pant,
            pyjama,
            blazer,
            deliveryDate,
            status,
        }=req.body

        if(!customerId){
            return res.status(400).json({success:false,error:"Customer is required"});
        }

        if(!deliveryDate){
            return res.status(400).json({success:false,error:"customer not found"});
        }

        //create a new order record using the values  extracted

        const order = new Order({
            customerId,
            shirt,
            pant,
            pyjama,
            blazer,
            deliveryDate,
            status,
        });

        await order.save();


        res.status(201).json({
            success:true,
            message:"Order created Successfully",
            order,
        });
    } catch(error){
        console.error("Create order Error:",error);
        res.status(500).json({
            success:false,
            error:"Server error while creating order",
        });
    }
};

//get all the orders
export const getAllOrders = async (req,res) => {
    try{
        const orders = await Order.find()
        .populate("customerId","name phone")
        .sort({createdAt:-1});

        res.json({success:true,orders});
    }catch(error){
        console.error("Fetch orders Errors:",error);
        res.status(500).json({
            success:false,
            error:"Server error while fetching orders",
        });
    }
};

// PUT /api/orders/:id
export const updateOrder = async (req, res) => {
  try {
    const { status, paymentDone } = req.body;

    
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (paymentDone !== undefined) updateData.paymentDone = paymentDone;




    const orders = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
       { new: true }
    ).populate("customerId", "name phone"); // 🔹 Important

    if (!Order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.json({ success: true, orders }); // 🔹 Send `order` (singular)
  } catch (err) {
    console.error("Update order failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// GET /api/orders/track/:phone
export const trackOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    // 1. Find the customer using phone number
    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // 2. Find all orders for that customer
    const orders = await Order.find({ customerId: customer._id })
      .populate("customerId", "name phone")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this phone number",
      });
    }

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Track order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while tracking order",
    });
  }
};
