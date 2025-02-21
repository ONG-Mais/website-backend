import { IEmailRecipient } from "./emailsender";

export interface IContact extends IEmailRecipient {
  type: "contact";
  subject: string;
  message: string;
}
