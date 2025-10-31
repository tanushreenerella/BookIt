import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  qty: { type: Number, default: 1 },
  promo: { type: String, default: null },
  amount: { type: Number, required: true }, // total charged or subtotal
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Booking", BookingSchema);
