import { Router } from "express";
import {initiator} from "../../initiator";

const router = Router();
const orderController = initiator.getOrderController();


router.post("/", (req, res) => orderController.createOrder(req, res));
router.patch("/execute", (req, res) => orderController.executeOrder(req, res));
router.patch("/cancel", (req, res) => orderController.cancelOrder(req, res));
router.get("/", (req, res) => orderController.getFilteredOrders(req, res));

export default router;
