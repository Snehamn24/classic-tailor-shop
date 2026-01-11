import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customerId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        shirts: {type:Number,default:0},
        pant:{type:Number,default:0},
        deliveryDate:{
            type:Date,
            required:true,
        },
        status: {
            type:String,
            enum:["Not Stitched","In Progress","Stitched","Delivered"],
            default: "Not Stitched",
        },
        paymentDone: {
    type: Boolean,
    default: false,
  },
    },
    {timestamps:true}
);

const Order = mongoose.model("Order",orderSchema);
export default Order;
