import { Router, Response, Request } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
} from "@ahmadyasser01/common";

const router = Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();
    // if there is orderId field in the ticket that means the ticket is reserved and we can't update it
    if (ticket.orderId)
      throw new BadRequestError("Cannot update reserved ticket");

    if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    //TODO: publish new event ticket updated

    res.status(200).json(ticket);
  }
);

export { router as updateTicketRouter };
