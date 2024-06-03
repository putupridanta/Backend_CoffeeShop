import { ParamsDictionary } from "express-serve-static-core";
import { IUsersParams, IusersQuery } from "./users";

export type AppParams = ParamsDictionary | IUsersParams;
// export type QueryParams = IusersQuery;