import { moment } from "https://deno.land/x/moment/moment.ts";
import { Header } from "./header.ts";

export class DateHeader extends Header {
  static DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss [GMT]";

  constructor(name: string, date: Date) {
    super(name);
    super.body = moment(date).format(DateHeader.DATE_RFC2822);
  }
}
