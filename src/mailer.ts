import { Email } from "./mime/email.ts";
import { TransportInterface } from "./transports/transport.ts";

class Mailer {
  constructor(transports: TransportInterface[]) {
  }

  send(email: Email) {
  }
}
