import {Request, Response} from "express-serve-static-core";
import { getAllPromo, createPromo, updatePromo, deletePromo } from "../repositories/promo";
import { IBodyPromo } from "../models/promo";

export const getPromo = async (req: Request, res:Response) =>{
    try {
        const result = await getAllPromo();
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

export const createNewPromo = async (req: Request<{}, {}, IBodyPromo>, res:Response) =>{
    try {
        const result = await createPromo(req.body);
        return res.status(201).json({
            message: "success",
            data: result.rows[0],
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

export const updateDataPromo = async (req: Request<{id:number}, {}, IBodyPromo>, res:Response) =>{
    const {id} = req.params;
      try {
          const result = await updatePromo(id,req.body);
          if (result.rows.length === 0) {
            return res.status(404).json({
              msg: "data tidak ditemukan",
              data: [],
            });
          }
          return res.status(200).json({
              message: "Update Success",
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

export const deleteDataPromo = async (req: Request<{id:number}>, res:Response) =>{
    const {id} = req.params;
    try {
        const result = await deletePromo(id);
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