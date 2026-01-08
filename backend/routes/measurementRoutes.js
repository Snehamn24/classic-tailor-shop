import express from "express";
import {
  getMeasurements,
  saveMeasurements,
  deleteMeasurements
} from "../controllers/MeasurementControllers.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getMeasurements);
router.post("/:id", authMiddleware, saveMeasurements);
router.delete("/:id", authMiddleware, deleteMeasurements);

export default router;
