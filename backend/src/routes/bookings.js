import express from "express";
import { body, validationResult } from "express-validator";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import { validatePromo } from "../utils/promos.js";

const router = express.Router();
// POST /promo/validate
router.post("/promo/validate", (req, res) => {
  const { code } = req.body;
  const result = validatePromo(code);
  res.json(result);
});

// POST /bookings
router.post(
  "/bookings",
  [
    body("experienceId").notEmpty(),
    body("name").notEmpty(),
    body("email").isEmail(),
    body("date").notEmpty(),
    body("time").notEmpty(),
    body("qty").isInt({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { experienceId, name, email, date, time, qty = 1, promo = null, amount } = req.body;

    try {
      const exp = await Experience.findById(experienceId);
      if (!exp) return res.status(404).json({ error: "Experience not found" });

      // find slot capacity if defined
      let capacity = null;
      if (exp.slots && exp.slots.length) {
        const slot = exp.slots.find(s => s.date === date && s.time === time);
        if (slot) capacity = slot.capacity;
      }
      if (capacity === null) capacity = 10; // default capacity

      // count existing bookings for this experience + slot
      const existingCount = await Booking.aggregate([
        { $match: { experience: exp._id, date: date, time: time } },
        { $group: { _id: null, totalQty: { $sum: "$qty" } } }
      ]);

      const alreadyBooked = existingCount.length ? existingCount[0].totalQty : 0;

      if (alreadyBooked + qty > capacity) {
        return res.status(409).json({ error: "Slot is sold out or not enough capacity" });
      }

      // Optionally validate promo and compute final amount here; for now trust client's amount but you could re-calc
      const promoInfo = validatePromo(promo);
      // recompute amount server-side (recommended)
      let serverAmount = exp.price * qty;
      if (promoInfo.valid) {
        if (promoInfo.type === "percent") {
          serverAmount = Math.round(serverAmount * (1 - promoInfo.value / 100));
        } else if (promoInfo.type === "flat") {
          serverAmount = Math.max(0, serverAmount - promoInfo.value);
        }
      }
      // taxes not included here — you can add taxes if needed
      // if client sent amount, you can compare and reject mismatches
      // For now we store serverAmount

      const booking = new Booking({
        experience: exp._id,
        name,
        email,
        date,
        time,
        qty,
        promo: promoInfo.valid ? promoInfo.code : null,
        amount: serverAmount
      });

      await booking.save();

      res.status(201).json({ message: "Booking confirmed", bookingId: booking._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
