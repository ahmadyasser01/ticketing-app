import { Listener, OrderCreatedEvent, Subjects } from "@ahmadyasser01/common";
import { OrderStatus } from "@ahmadyasser01/common/build/events/Interfaces/order-status";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";
//testing workflows+1

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting ", delay, " milliseconds to process the job");
    await expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
