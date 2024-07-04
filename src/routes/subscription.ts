import express from "express";

// Controller
import {
  getALl,
  addSubscription
} from "../controller/subscription";

const router = express.Router();

router.get("/", getALl);
router.post("/", addSubscription);

module.exports = router;