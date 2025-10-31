import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import promoRoutes from "./src/routes/promoRoutes.js";
import experiencesRouter from "./src/routes/experiences.js";
import bookingsRouter from "./src/routes/bookings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Global CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bookit-1-4x4p.onrender.com"); // frontend
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ✅ Handle preflight requests for all routes — safe for Express 5
app.options(/.*/, (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://bookit-1-4x4p.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendStatus(200);
});

app.use(express.json());

// ✅ MongoDB connection
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");
} catch (err) {
  console.error("Mongo connection error:", err);
  process.exit(1);
}

// ✅ Routes
app.use("/api/experiences", experiencesRouter);
app.use("/api", bookingsRouter);
app.use("/api/promo", promoRoutes);

app.get("/", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
