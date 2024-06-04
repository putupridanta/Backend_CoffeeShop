import { IdataProfile } from "./users";

interface IpaginationMeta {
    totalData?: number;
    totalPage?: number;
    page: number;
    prevLink: string;
    nextLink: string;
}

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