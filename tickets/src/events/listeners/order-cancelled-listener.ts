import { Listener, Subjects, OrderCancelledEvent } from "@ahmadyasser01/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // when order cancelled event is issued we want to
    // find the ticket associated to the order
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket is found throw an error
    if (!ticket) throw new Error("Ticket Not found");
    // set order Id to undefined
    ticket.set({ orderId: undefined });
    //save the ticket
    await ticket.save();
    // publish ticket udpated,
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    //ack the msg
    msg.ack();
  }
}
