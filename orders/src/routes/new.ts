import mongoose from "mongoose";
import { Request, Response, Router, NextFunction } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from "@ahmadyasser01/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

const EXPIRATION_WINDOW_SECONDS = 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TickedId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    // extract ticket and find ticket by id
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    // throw error if not found
    if (!ticket) throw new NotFoundError();
    // check if ticket is reserved throw error if yes
    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError("Ticket is reserved");
    // calculate expiratio from now time
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    // create order
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    // save in db
    await order.save();
    // publish orderCreated event
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });
    // send response to user
    res.status(201).json(order);
  }
);

export { router as newOrderRouter };
