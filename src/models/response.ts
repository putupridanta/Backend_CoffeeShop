import { IdataProfile } from "./users";

export interface IPofileResponse extends IBasicResponse{
    data?: IdataProfile[];
}
export interface IBasicResponse {
    msg: string;
    data?: any[];
    err?: string;
}

export interface IAuthResponse extends IBasicResponse {
    data?: { token: string }[];
  }