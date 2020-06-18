import { Email } from "../mime/email.ts";

export interface TransportInterface {
  send(email: Email): Promise<void>;
}
