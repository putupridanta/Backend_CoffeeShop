import {Request, Response} from "express-serve-static-core";
import bcrypt from "bcrypt";
import { getAllUsers, getOneUsers, createUsers, 
  updateUsers, deleteUsers, getProfile, 
  registerUser, getloginUser, setImageProfile,
  } from "../repositories/users";
import { IBodyUser, IRegisterBodyUser, IuserLoginBody, IusersQuery } from "../models/users";
import { IAuthResponse, IPofileResponse } from "../models/response";
import { IPayload } from "../models/payload";
import jwt from "jsonwebtoken";
import { jwtOptions } from "../middleware/authorization";



export const getUsers = async (
    req: Request<{}, {}, {}, IusersQuery>, 
    res:Response) =>{
    try {
        const result = await getAllUsers(req.query);
        if (result.rows.length === 0) {
          return res.status(404).json({
            msg: "Users tidak ditemukan",
            data: [],
          });
        }
        return res.status(200).json(result.rows);
    } catch (err: unknown) {
        let message = "Internal Server Error";
        if( err instanceof Error){
            message = err.message;
        }
        return res.status(500).json({
            msg: "Error",
            err: message,
        })
    }
};

export const getAllProfile = async (req: Request, res:Response) =>{
  try {
      const result = await getProfile();
      return res.status(200).json(result.rows);
  } catch (err: unknown) {
      let message = "Internal Server Error";
      if( err instanceof Error){
          message = err.message;
      }
      return res.status(500).json({
          msg: "Error",
          err: message,
      })
  }
};

export const getDetailUsers = async (req: Request<{ uid_user: string}>, res:Response) =>{
    const {uid_user} = req.params;
    try {
        const result = await getOneUsers(uid_user);
        if (result.rows.length === 0) {
            return res.status(404).json({
              msg: "Users tidak ditemukan",
              data: [],
            });
          }
          return res.status(200).json({
            msg: "Succes",
            data: result.rows,
          });
    } catch (err: unknown) {
        let message = "Internal Server Error";
        if( err instanceof Error){
            message = err.message;
        }
        return res.status(500).json({
            msg: "Error",
            err: message,
        })
    }
};

export const createNewUser = async (req: Request<{}, {}, IBodyUser>, res:Response) =>{
    try {
        const result = await createUsers(req.body);
        return res.status(201).json({
            message: "success",
            data: result.rows,
          });
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.message);
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }
};

export const regisNewUser = async (req: Request<{}, {}, IRegisterBodyUser>, res: Response) =>{
  const { password } = req.body;
  
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    
    const result = await registerUser(req.body, hashed);
    if(result.rows.length < 5) throw new Error ("password length must be 5");
    return res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        msg:"Error",
        err: error.message,
      })
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
}

export const loginUser = async (
  req: Request<{}, {}, IuserLoginBody>, 
  res:Response<IAuthResponse>
) =>{
  const {email, password} = req.body;
    try {
        //login menggunakan email
        const result = await getloginUser(email);
        
        //handling error jika password tidak di temukan
        if (!result.rows.length) throw new Error ("User tidak ditemukan");
        const {password: hash} = result.rows[0];
        //pengecekan apakah password sama

        const isPwdValid = await bcrypt.compare(password, hash);
        
        //handling jika password salah
        if (!isPwdValid) throw new Error("Login gagal");
        const payload: IPayload = {
          email,
        };
        //mendapatkan token
        const token = jwt.sign(payload, <string>process.env.JWT_SECRET, jwtOptions);
        return res.status(200).json({
            msg: `Selamat datang, ${email}!`,
            data: [{token}],
          });
        } catch (error) {
          if (error instanceof Error) {
            if (/(invalid(.)+uuid(.)+)/g.test(error.message)) {
              return res.status(401).json({
                msg:"Error",
                err:"User tidak ditemukan",
              });
            }
            return res.status(401).json({
              msg:"Error",
              err: error.message,
            })
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }
};

// upload images profile
export const imageProfile = async (req: Request<{user_id:string}>, res:Response<IPofileResponse>) =>{
  const {
    file,
    params: {user_id}
  } = req;
    if (!file)
      return res.status(400).json({
        msg: "File not found",
        err: "Only receive input for image files (JPG, PNG, JPEG)",
      });
    try {
        const result = await setImageProfile(user_id, file?.filename);
        if (result.rows.length === 0) {
          return res.status(404).json({
            msg: "Data tidak ditemukan",
            data: [],
          });
        }
        return res.status(200).json({
            msg: "Gambar berhasil ditambahkan",
            data: result.rows,
          });
        } catch (error) {
          if (error instanceof Error) {
            if (/(invalid(.)+uuid(.)+)/g.test(error.message)) {
              return res.status(401).json({
                msg:"Error",
                err:"User tidak ditemukan",
              });
            }
            return res.status(401).json({
              msg:"Error",
              err: error.message,
            })
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }
};

// update users
export const updateDataUser = async (req: Request<{user_id:string}>, res:Response<IPofileResponse>) =>{
  const {user_id} = req.params;
  console.log(user_id);
  
    try {
        const result = await updateUsers(req.body, user_id);
        if (result.rows.length === 0) {
          return res.status(404).json({
            msg: "Users tidak ditemukan",
            data: [],
          });
        }
        return res.status(201).json({
            msg: "success",
            data: result.rows,
          });
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.message);
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }
};

export const deleteDataUser = async (req: Request<{ uid_user: string}>, res:Response) =>{
  const {uid_user} = req.params;
  try {
      const result = await deleteUsers(uid_user);
        return res.status(200).json({
          msg: "Data Berhasil Dihapus",
          data: result.rows[0],
        });
  } catch (err: unknown) {
      let message = "Internal Server Error";
      if( err instanceof Error){
          message = err.message;
      }
      return res.status(500).json({
          msg: "Error",
          err: message,
      })
  }
};