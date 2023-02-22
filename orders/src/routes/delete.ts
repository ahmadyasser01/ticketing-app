import mongoose from "mongoose";
import { Request, Response, Router, NextFunction } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  NotAuthorizedError,
} from "@ahmadyasser01/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    // find order by id
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    // throw error if not found
    if (!order) throw new Error(`Order NOT found`);
    // if not user order throw not auth error
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    // mark order as cancelled
    order.status = OrderStatus.Cancelled;
    // save order
    await order.save();
    // publish order cancelled Event
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    // return response to user
    res.status(200).json(order);
  }
);
