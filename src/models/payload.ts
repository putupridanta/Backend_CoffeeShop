import { JwtPayload } from "jsonwebtoken";
export interface IPayload extends JwtPayload {
  // jangan masukkan data sensitif
//   uid_user?: string;
    email: string;
  //   phone: number;
  // role?: string;
}