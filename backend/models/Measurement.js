import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    unique: true
  },
  
  // Shirt Measurements
  shirtLength: { type: String, default: "" },
  shirtChest: { type: String, default: "" },
  shirtWaist: { type: String, default: "" },
  shirtShoulder: { type: String, default: "" },
  shirtSleeve: { type: String, default: "" },
  
  // Pant Measurements
  pantLength: { type: String, default: "" },
  pantWaist: { type: String, default: "" },
  pantHip: { type: String, default: "" },
  pantThigh: { type: String, default: "" },
  pantBottom: { type: String, default: "" },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



const Measurement = mongoose.model('Measurement', measurementSchema);
export default Measurement;