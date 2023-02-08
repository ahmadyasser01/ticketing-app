import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@ahmadyasser01/common";
import { Password } from "../services/password";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email is required and to be valid "),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    // pull email and password from req body
    const { email, password } = req.body;
    // check email exisitance
    const exisitingUser = await User.findOne({ email });

    // throw error if not found
    if (!exisitingUser) throw new BadRequestError("Invalid Credentials");
    // check password match
    const passwordMatched = await Password.compare(
      exisitingUser.password,
      password
    );

    if (!passwordMatched) throw new BadRequestError("Invalid Credentials");
    // sign user jwt
    const userJwt = jwt.sign(
      {
        id: exisitingUser.id,
        email: exisitingUser.email,
      },
      process.env.JWT_KEY!
    );
    // store the jwt in session
    req.session = { jwt: userJwt };
    // return response
    res.status(200).json(exisitingUser);
  }
);

export { router as signinRouter };
