import { Listener, OrderCreatedEvent, Subjects } from "@ahmadyasser01/common";
import { OrderStatus } from "@ahmadyasser01/common/build/events/Interfaces/order-status";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    //TODO: CREATE DELAY
    //TODO: ADD TO QUEUE THE DELAY

    msg.ack();
  }
}
