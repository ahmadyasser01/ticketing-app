import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "ticket-test",
    price: 99,
  });
};

it("fetches the list of tickets", async () => {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(createTicket());
  }
  await Promise.all(arr);

  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(5);
});
