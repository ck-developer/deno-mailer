import { BufReader, BufWriter } from "https://deno.land/std/io/bufio.ts";
import { TextProtoReader } from "https://deno.land/std/textproto/mod.ts";
import { EventEmitter } from "https://deno.land/std/node/events.ts";

export const SMTP_CONNECT_EVENT = "connect";

export class SmtpRespone {
  constructor(
    readonly code: Number,
    readonly reason?: string,
  ) {}

  static fromString(line: (string | null)) {
    if (!line) {
      return new SmtpRespone(999);
    }

    const matched = line.toString().match(/(\d{3})\s(.*)/);

    if (!matched) return new SmtpRespone(0);

    const [, code, reason] = matched;

    return new SmtpRespone(new Number(code), reason);
  }
}

export interface SmtpConnectEvent {
  code: number;
}

export interface SmtpConfig {
  hostname: string;
  port: number;
  tls?: boolean;
  auth?: {
    username: string;
    password: string;
  };
}

export interface SmtpClientInterface {
  /**
   * @throws `Deno.errors.ConnectionReset`
   */
  send(data: string): Promise<SmtpRespone | null>;

  /** Close connection after sending close frame to peer.
   * This is canonical way of disconnection but it may hang because of peer's response delay.
   * Default close code is 1000 (Normal Closure)
   * @throws `Deno.errors.ConnectionReset`
   */
  close(): Promise<void>;
}

export class SmtpClient extends EventEmitter implements SmtpClientInterface {
  private conn: Deno.Conn;
  private bufReader: TextProtoReader;
  private bufWriter: BufWriter;
  private isClosed: boolean = false;

  constructor(
    private readonly config: SmtpConfig,
  ) {
    super();
  }

  connect() {
    return Deno.connect({
      hostname: this.config.hostname,
      port: this.config.port,
    }).then((conn) => {
      this.conn = conn;
      this.bufReader = new TextProtoReader(new BufReader(conn));
      this.bufWriter = new BufWriter(conn);

      return this.read();
    }).then((res) => {
      if (res.code !== 220) {
      }
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.conn.close());
      } catch (e) {
        reject(e);
      }
    });
  }

  closeForce(): void {
    return this.conn.close();
  }

  read(): Promise<SmtpRespone> {
    return this.bufReader.readLine().then((line) => {
      return SmtpRespone.fromString(line);
    });
  }

  send(data: string): Promise<SmtpRespone | null> {
    return this.bufWriter.write((new TextEncoder()).encode(data + "\r\n")).then(
      (toto) => {
        return this.bufWriter.flush();
      },
    ).then(() => {
      return this.read();
    }).then((res) => {
      this.closeForce();

      return res;
    });
  }
}
