import { IEmailRecipient } from "./emailsender";

export interface IVolunteer extends IEmailRecipient {
  type: "volunteer";
  telefone: string;
  city: string;
  state: string;
}
