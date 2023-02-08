import express, { Request, Response } from "express";
import { currentUser } from "@ahmadyasser01/common";

const router = express.Router();

router.get("/api/users/me", currentUser, (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
});
