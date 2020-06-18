import { SmtpClientInterface } from "../clients/smtp.client.ts";
import { TransportInterface } from "./transport.ts";
import { Email } from "../mime/email.ts";

export class SmtpTransport implements TransportInterface {
  private client: SmtpClientInterface;

  send(email: Email): Promise<void> {
    return Promise.resolve()
  }
}
