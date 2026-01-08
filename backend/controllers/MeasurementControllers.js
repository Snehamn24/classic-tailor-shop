import Measurement from "../models/Measurement.js";
import Customer from "../models/Customer.js";

// GET measurements
const getMeasurements = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("GET measurements for:", id);

    const measurements = await Measurement.findOne({ customerId: id });

    if (!measurements) {
      return res.status(404).json({
        success: false,
        error: "No measurements found"
      });
    }

    res.status(200).json({
      success: true,
      measurements
    });

  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// POST (Save / Update)
const saveMeasurements = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Customer ID from URL:", id);
    console.log("Measurement body:", req.body);

    // Check if customer exists
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    let measurement = await Measurement.findOne({ customerId: id });

    if (measurement) {
      // Update
      measurement = await Measurement.findOneAndUpdate(
        { customerId: id },
        req.body,
        { new: true }
      );
    } else {
      // Create
      measurement = new Measurement({
        customerId: id,
        ...req.body
      });
      await measurement.save();
    }

    res.status(200).json({
      success: true,
      message: "Measurements saved successfully",
      measurements: measurement
    });

  } catch (err) {
    console.error("SAVE error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// DELETE
const deleteMeasurements = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Measurement.findOneAndDelete({ customerId: id });

    if (!result) {
      return res.status(404).json({ success: false, error: "No measurements found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export { getMeasurements, saveMeasurements, deleteMeasurements };
