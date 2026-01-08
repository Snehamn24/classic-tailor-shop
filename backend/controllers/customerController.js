import Customer from "../models/Customer.js";

const addCustomer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Name and phone are required",
      });
    }

    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        error: "Customer with this phone number already exists",
      });
    }

    const newCustomer = new Customer({
      name,
      phone,
      address,
    });

    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: "Customer added successfully",
      customer: newCustomer,
    });

  } catch (error) {
    console.error("addCustomer error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error("getCustomers error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ADD THESE NEW FUNCTIONS:

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        error: "Customer not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      customer 
    });
  } catch (error) {
    console.error("getCustomerById error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ 
        success: false, 
        error: "Customer not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      customer: updatedCustomer 
    });
  } catch (error) {
    console.error("updateCustomer error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ 
        success: false, 
        error: "Customer not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Customer deleted successfully" 
    });
  } catch (error) {
    console.error("deleteCustomer error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
};

// Export ALL functions
export { 
  addCustomer, 
  getCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer 
};