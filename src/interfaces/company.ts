export interface ICompanyRequest {
  id: string;
  email: string;
  name: string;
  telefone: string;
  state: string;
  city: string;
  type: string;
}

export interface ICompanyResponse {
  id: string;
  email: string;
  name: string;
  telefone: string;
  state: string;
  city: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
