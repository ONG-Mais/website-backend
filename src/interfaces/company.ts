import { IEmailRecipient } from "./emailsender";

export interface ICompany extends IEmailRecipient {
  type: "company";
  telefone: string;
  city: string;
  state: string;
}
