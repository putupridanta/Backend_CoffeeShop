import {Request, Response} from "express-serve-static-core";
import { createOrder, deleteOrder, getAllOrder, updateOrder } from "../repositories/order";
import { IBodyOrder, IOrderQuery } from "../models/order";

export const getOrder = async (
  req: Request<{}, {}, {}, IOrderQuery>, 
  res:Response) =>{
    try {
        const result = await getAllOrder(req.query);
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

export const createNewOrder = async (req: Request<{}, {}, IBodyOrder>, res:Response) =>{
    try {
        const result = await createOrder(req.body);
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

export const updateDataOrder = async (req: Request<{id:number}, {}, IBodyOrder>, res:Response) =>{
    const {id} = req.params;
      try {
          const result = await updateOrder(id,req.body);
          if (result.rows.length === 0) {
            return res.status(404).json({
              msg: "data tidak ditemukan",
              data: [],
            });
          }
          return res.status(200).json({
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

export const deleteDataOrder = async (req: Request<{id:number}>, res:Response) =>{
    const {id} = req.params;
    try {
        const result = await deleteOrder(id);
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