import loadMarketData from "../controllers/marketData.controller.js";
import express from "express"

const router = express.Router();

router.get('/', loadMarketData);

export default router;