import { Router, Response, Request } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@ahmadyasser01/common";

const router = Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return new NotFoundError();
  }
  res.status(200).json(ticket);
});

export { router as ShowTicketRouter };
