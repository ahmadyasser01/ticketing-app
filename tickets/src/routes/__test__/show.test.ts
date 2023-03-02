import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

const createTicket = async (title: string, price: number) => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });
  return response;
};

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns ticket if the ticket is found", async () => {
  const title = "test";
  const price = 100;
  const ticket = await createTicket(title, price);

  const response = await request(app)
    .get(`/api/tickets/${ticket.body.id}`)
    .send()
    .expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
