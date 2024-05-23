import express from "express"
import LoadStockData from "../controllers/stocks.controller.js"

const router = express.Router();

router.post('/loadData', LoadStockData);

export default router;