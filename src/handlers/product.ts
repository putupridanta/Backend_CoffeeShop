import {Request, Response} from "express-serve-static-core";
import { createProduct, deleteProduct, filterProduct, getAllProduct, getOneProduct, priceingProduct, updateProduct } from "../repositories/product"; 
import { IBodyProduct } from "../models/product";

export const getProduct = async (req: Request, res:Response) =>{
    try {
        const result = await getAllProduct(req.query);
        if (result.rows.length === 0) {
          return res.status(404).json({
            msg: "Data tidak ditemukan",
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

export const getDetailProduct = async (req: Request<{ id: number}>, res:Response) =>{
    const {id} = req.params;
    try {
        const result = await getOneProduct(id);
        if (result.rows.length === 0) {
            return res.status(404).json({
              msg: "Data tidak ditemukan",
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
}

export const createNewProduct = async (req: Request<{}, {}, IBodyProduct>, res:Response) =>{
    try {
        const result = await createProduct(req.body);
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

export const updateDataProduct = async (req: Request<{id:number}, {}, IBodyProduct>, res:Response) =>{
    const {id} = req.params;
      try {
          const result = await updateProduct(id,req.body);
          if (result.rows.length === 0) {
            return res.status(404).json({
              msg: "product tidak ditemukan",
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

export const deleteDataProduct = async (req: Request<{id:number}>, res:Response) =>{
    const {id} = req.params;
    try {
        const result = await deleteProduct(id);
          return res.status(200).json({
            msg: "Data Berhasil Dihapus",
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

export const priceProduct = async (req: Request<{}, {}, {}, {keyword:string; price1:number; price2:number}>, res:Response) =>{
  const {keyword, price1, price2} = req.query
  try {
    const result = await priceingProduct(keyword, price1, price2);
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

export const filteringProduct = async (req: Request<{}, {}, {}, {keyword:string; search:string; price1:number; price2:number; sort:string}>, res:Response) =>{
  const {keyword, search, price1, price2, sort} = req.query
  try {
    const result = await filterProduct(keyword, search, price1, price2, sort);
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