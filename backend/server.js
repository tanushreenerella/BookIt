import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import promoRoutes from "./src/routes/promoRoutes.js";
import experiencesRouter from "./src/routes/experiences.js";
import bookingsRouter from "./src/routes/bookings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mongo connection
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");
} catch (err) {
  console.error("Mongo connection error:", err);
  process.exit(1);
}

// Routes
app.use("/api/experiences", experiencesRouter);
app.use("/api", bookingsRouter);
app.use("/api/promo", promoRoutes);
app.get("/", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
