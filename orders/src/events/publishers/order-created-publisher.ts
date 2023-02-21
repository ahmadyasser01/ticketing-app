import { Publisher, OrderCreatedEvent, Subjects } from "@ahmadyasser01/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
