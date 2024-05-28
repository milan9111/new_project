import { ISignedInUser } from './ISignedInUser';

export interface ISignIn {
  username: string;
  password: string;
}

export interface ISignInResponse {
  status: number;
  data: ISignedInUser;
}