import { SmtpTransport } from "../../src/transports/smtp.transport.ts";

Deno.test("[smtp transport] connect", async () => {
  const smtpTransport = new SmtpTransport();
});
