import express from "express"
import addOrder, {getOrders} from "../controllers/orders.controller.js"
import { placeOrderToUpstox, getOrdersFromUpstox, cancelOrderToUpstox } from "../ordersAPI/upstox/callAPIsToUpstox.js";

const router = express.Router();

router.post('/add', addOrder);
router.get('/get', getOrders);

router.post('/placeOrder', placeOrderToUpstox);
router.get('/getOrders', getOrdersFromUpstox);
router.delete('/cancel', cancelOrderToUpstox);

export default router;

