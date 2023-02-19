import { Router, Response, Request } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@ahmadyasser01/common";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price is required and to be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).json(ticket);
  }
);

export { router as createTicketRouter };
