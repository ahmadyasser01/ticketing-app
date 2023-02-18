import { Publisher, Subjects, TicketCreatedEvent } from "@ahmadyasser01/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
