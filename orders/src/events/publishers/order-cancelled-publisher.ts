import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@ahmadyasser01/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
