import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@ahmadyasser01/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

//testing workflows+1
