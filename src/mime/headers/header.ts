import { HeaderInterface } from "./header.interface.ts";

export class Header implements HeaderInterface {
  name: string;
  body: string;
  charset: string = "utf-8";
  lineLength: number = 76;
  language?: string;

  constructor(name: string) {
    this.name = name;
  }
}
