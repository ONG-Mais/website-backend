import { ICompany } from "./company";
import { IContact } from "./contact";
import { IVolunteer } from "./volunteer";

export type RecipientType = "volunteer" | "company" | "contact";

export interface IEmailRecipient {
  name: string;
  email: string;
  type: RecipientType;
  telefone?: string;
  city?: string;
  state?: string;
  subject?: string;
  message?: string;
}
export interface IEmailData {
  volunteer: {
    title: string;
    subject: string;
    message: string;
    info: string;
    data: IVolunteer;
  };
  company: {
    title: string;
    subject: string;
    message: string;
    info: string;
    data: ICompany;
  };
  contact: {
    title: string;
    subject: string;
    message: string;
    info: string;
    data: IContact;
  };
}
