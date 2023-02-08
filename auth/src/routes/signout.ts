import express, { Request, Response } from "express";
import { currentUser } from "@ahmadyasser01/common";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null;

  res.status(200).json({});
});
