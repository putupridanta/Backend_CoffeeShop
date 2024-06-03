import { QueryResult } from "pg";
import db from "../configs/pg";
import { dataOrder, IBodyOrder, IOrderQuery } from "../models/order"; 

export const getAllOrder = ({
        no_order,
        page,
        limit
        }: IOrderQuery): Promise<QueryResult<dataOrder>>  => {
        let query = `select o.no_order , u.email , u.phone , p2.product_name as "Nama Produk", 
        p2.price as "Harga", p.promo_kode as "kode promo", p.discount
        from ordercoffee o  
        join product p2 
        on o.product_id = p2.id 
        join users u 
        on o.user_id = u.id 
        join promo p 
        on o.promo_id = p.id `;
        const values= [];
        
        if (no_order) {
        query += "WHERE no_order ILIKE $1"
        values.push(`%${no_order}%`)
        }
        query += " ORDER BY o.id asc";
        
        if (page && limit) {
        const pageLimit = parseInt(limit);
        const offset = (parseInt(page) - 1)* pageLimit;
        query += ` limit $${values.length + 1} offset $${values.length + 2}`;
        values.push(pageLimit, offset);
        }
        return db.query(query, values);
}

export const createOrder = (body: IBodyOrder): Promise<QueryResult<dataOrder>> => {
        let query = `insert into orderCoffee (user_id, product_id, promo_id, no_order) 
        values ($1,$2,$3,$4) returning*`;
        const {user_id, product_id, promo_id, no_order} = body;
        const values=[user_id, product_id, promo_id, no_order];
        return db.query(query, values);
}

export const updateOrder = (id: number, body: IBodyOrder): Promise<QueryResult<dataOrder>> =>{        
        let query = `update orderCoffee set 
        user_id = $1, product_id = $2, promo_id = $3, no_order = $4
        where id = $5 returning*`
        const{user_id, product_id, promo_id, no_order}=body;
        const values = [user_id, product_id, promo_id, no_order, id];
        return db.query(query, values);
}

export const deleteOrder = (id:number): Promise<QueryResult<dataOrder>> =>{
        const query = `delete from orderCoffee where id = $1`;
        const values = [id];
        return db.query(query, values);
 }