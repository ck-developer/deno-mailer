export class Email {
  static PRIORITY_HIGHEST = 1;
  static PRIORITY_HIGH = 2;
  static PRIORITY_NORMAL = 3;
  static PRIORITY_LOW = 4;
  static PRIORITY_LOWEST = 5;

  text: string;
  textCharset: string;
  html: string;
  htmlCharset: string;

  attachments: [];
}
