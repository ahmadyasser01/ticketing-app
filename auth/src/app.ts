import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@ahmadyasser01/common";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
// Auth routes

//fallback routing
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
