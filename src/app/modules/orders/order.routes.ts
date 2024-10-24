import { Router } from "express";
import { createOrder, getAllOrders, getOrderByUserId, getSingleOrder, updateOrderStatus } from "./order.controllers";

const router = Router();

router.post('/orders/', createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getSingleOrder);
router.get('/orders/user/:id', getOrderByUserId);
router.put('/orders/:id', updateOrderStatus)

export const orderRouter = router;