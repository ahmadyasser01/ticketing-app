import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@ahmadyasser01/common";
import { User } from "../models/user";

const router = Router();

router.post(
  "/api/users/signup",
  [],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) throw new BadRequestError("User Already Exists");

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
