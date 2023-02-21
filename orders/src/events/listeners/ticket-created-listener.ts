import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@ahmadyasser01/common";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;
  onMessage(
    data: {
      id: string;
      version: number;
      title: string;
      price: number;
      userId: string;
    },
    msg: Message
  ): void {
    throw new Error("Method not implemented.");
    //TODO: Implement Logic of on Message
  }
}
