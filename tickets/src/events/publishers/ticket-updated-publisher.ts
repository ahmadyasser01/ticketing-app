import { Publisher, Subjects, TicketUpdatedEvent } from "@ahmadyasser01/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
