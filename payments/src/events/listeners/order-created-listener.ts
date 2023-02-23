import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@ahmadyasser01/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    // const order = Order.build({
    //   id: data.id,
    //   price: data.ticket.price,
    //   status: data.status,
    //   userId: data.userId,
    //   version: data.version,
    // });
  }
}
