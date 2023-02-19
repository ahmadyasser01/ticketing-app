import mongoose from "mongoose";
import { app } from "./app";

//TODO: ADD LISTENER TO INDEX.TS

const start = async () => {
  // check for environment variables
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  //TODO: CHECK FOR  NATS ENVIROMENT VARAIABLES
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS CLIENT ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS URL ID must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS CLUSTER ID must be defined");
  }
  try {
    //TODO:  LISTEN TO EVENTS
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000 ...");
  });
};

start();
