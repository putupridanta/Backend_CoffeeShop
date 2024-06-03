import { QueryResult } from "pg";
import db from "../configs/pg";
import { dataPromo, IBodyPromo } from "../models/promo"; 

export const getAllPromo = (): Promise<QueryResult<dataPromo>>  => {
        const query = `select * from promo`;
        return db.query(query);
}
export const createPromo = (body: IBodyPromo): Promise<QueryResult<dataPromo>> => {
        let query = `insert into promo (promo_kode, product_id, discount) 
        values ($1) returning*`;
        const {promo_kode, product_id, discount} = body;
        const values=[promo_kode, product_id, discount];
        return db.query(query, values);
}

export const updatePromo = (id: number, body: IBodyPromo): Promise<QueryResult<dataPromo>> =>{        
        let query = `update promo set promo_kode = $1 where id = $2 returning*`
        const{promo_kode}=body;
        const values = [promo_kode, id];
        return db.query(query, values);
}

export const deletePromo = (id:number): Promise<QueryResult<dataPromo>> =>{
        const query = `delete from promo where id = $1`;
        const values = [id];
        return db.query(query, values);
}