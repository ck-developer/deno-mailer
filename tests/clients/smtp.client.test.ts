import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {
  SmtpClient,
  SmtpConnectEvent,
  SMTP_CONNECT_EVENT,
} from "../../src/clients/smtp.client.ts";

Deno.test("[smtp client] connect", async () => {
  const smtpTransport = new SmtpClient({
    hostname: "127.0.0.1",
    port: 1025,
  });

  await smtpTransport.connect().then(() => {
    return smtpTransport.send("QUIT");
  });
});
