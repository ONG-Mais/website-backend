export interface IVolunteerRequest {
  id: string;
  email: string;
  name: string;
  telefone: string;
  state: string;
  city: string;
}

export interface IVolunteerResponse {
  id: string;
  email: string;
  name: string;
  telefone: string;
  state: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}
