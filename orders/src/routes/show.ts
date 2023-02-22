import { Request, Response, Router, NextFunction } from "express";
import {
  requireAuth,
  OrderStatus,
  NotAuthorizedError,
  NotFoundError,
} from "@ahmadyasser01/common";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    res.status(200).json(order);
  }
);
