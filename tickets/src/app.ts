import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@ahmadyasser01/common";

import { createTicketRouter } from "./routes/new";
import { indexTicketRouter } from "./routes";
import { ShowTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";

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
// Ticket routes
app.use(createTicketRouter);
app.use(ShowTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

//fallback routing
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
