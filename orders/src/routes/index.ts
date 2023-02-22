import { Request, Response, Router, NextFunction } from "express";
import { requireAuth } from "@ahmadyasser01/common";
import { Order } from "../models/order";

const router = Router();

router.get(
  "/api/orders",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate(
      "ticket"
    );

    res.status(200).json(orders);
  }
);
export { router as indexOrderRouter };
