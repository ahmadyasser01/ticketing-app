import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@ahmadyasser01/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: ExpirationCompleteEvent["data"],
    msg: Message
  ): Promise<void> {
    //TODO: FIND order by id and populate ticket
    const order = await Order.findById(data.orderId).populate("ticket");
    // if no order throw error
    if (!order) throw new Error("Order not found");
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    // mark order as cancelled
    order.set({ status: OrderStatus.Cancelled });
    // publish order Cancelled event
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
  }
}
