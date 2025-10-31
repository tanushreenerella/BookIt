// backend/src/routes/promoRoutes.js
import express from "express";
const router = express.Router();

// simple mock validation — replace with DB check if needed
router.get("/:code", (req, res) => {
  const { code } = req.params;

  const validPromos = {
    SAVE10: 10,
    WELCOME20: 20,
    FESTIVE50: 50,
  };

  if (validPromos[code]) {
    res.json({ valid: true, discount: validPromos[code] });
  } else {
    res.json({ valid: false });
  }
});

export default router;
