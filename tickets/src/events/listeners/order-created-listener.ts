import {
  Listener,
  Subjects,
  OrderCreatedEvent,
  OrderStatus,
  NotFoundError,
} from "@ahmadyasser01/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = "";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // when order is created we want to

    // find the ticket associated to the order
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket is found throw an error
    if (!ticket) throw new Error("Ticket not found");
    // mark the ticket as being reserved with orderId
    ticket.set({ orderId: data.id });
    // save the ticket
    await ticket.save();
    // TODO: Publish ticket updated event
    // await new TicketUpdatedPublisher(this.client).publish()
    // ack the msg
    msg.ack();
  }
}
