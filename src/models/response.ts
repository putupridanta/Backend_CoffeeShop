import { IdataProfile } from "./users";
import { dataUsers } from "./users";

interface IPaginationMeta {
    totalData?: number;
    totalPage?: number;
    page: number;
    prevLink: string | null;
    nextLink: string | null;
}

interface IBasicResponse {
    msg: string;
    data?: any[];
    err?: string;
    meta?: IPaginationMeta;
}

export interface IUserResponse extends IBasicResponse {
    data?: dataUsers[];
  }

export interface IPofileResponse extends IBasicResponse{
    data?: IdataProfile[];
}

export interface IAuthResponse extends IBasicResponse {
    data?: { token: string }[];
  }