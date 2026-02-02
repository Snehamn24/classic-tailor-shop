import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    shirt: {
      type: Number,
      required: true,
      min: 0,
    },

    pant: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Not Stitched", "In Progress", "Stitched", "Delivered"],
      default: "Not Stitched",
    },

    paymentDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true, 
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;