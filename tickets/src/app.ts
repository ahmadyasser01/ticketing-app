import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@ahmadyasser01/common";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);
// Auth routes
// app.use(currentUserRouter);
// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(signupRouter);

//fallback routing
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
