import { QueryResult } from "pg";
import db from "../configs/pg";
import { dataProduct, IBodyProduct, IproductQuery } from "../models/product"; 

export const createProduct = (body: IBodyProduct): Promise<QueryResult<dataProduct>> => {
        let query = `insert into product (product_name, price, type_product, dsc, size_p, stock) 
        values ($1,$2,$3,$4,$5,$6) returning*`;
        const {name, price, type_product, description, size_product, stock} = body;
        const values=[name, price, type_product, description, size_product, stock];
        return db.query(query, values);
}

export const updateProduct = (id: number, body: IBodyProduct): Promise<QueryResult<dataProduct>> =>{        
        let query = `update product set 
        product_name = $1, price = $2, type_product = $3, dsc = $4, size_p = $5, stock = $6
        where id = $7 returning*`
        const{name, price, type_product, description, size_product, stock}=body;
        const values = [name, price, type_product, description, size_product, stock, id];
        return db.query(query, values);
}

export const deleteProduct = (id:number): Promise<QueryResult<dataProduct>> =>{
        const query = `delete from product where id = $1 returning*`;
        const values = [id];
        return db.query(query, values);
}

export const getAllProduct = ({
        name,
        page,
        limit,
        }: IproductQuery): Promise<QueryResult<dataProduct>>  => {
        let query = `SELECT p.product_name AS "Nama Produk", 
        p.price AS "Harga", c.category_name AS "Kategori", 
        p.dsc AS "Descripsi"
        FROM product p 
        JOIN category c 
        ON p.category_id = c.id`;
        const values= [];
        
        if (name) {
        query += "WHERE name ILIKE $1"
        values.push(`%${name}%`)
        }
        query += " ORDER BY p.id asc";
        
        if (page && limit) {
        const pageLimit = parseInt(limit);
        const offset = (parseInt(page) - 1)* pageLimit;
        query += ` limit $${values.length + 1} offset $${values.length + 2}`;
        values.push(pageLimit, offset);
        }
        return db.query(query, values);
}

export const getOneProduct = (id: number): Promise<QueryResult<dataProduct>> =>{
        const query = `select * from product where id = $1`;
        const values = [id];
        return db.query(query, values);
}

export const priceingProduct = (keyword: string, price1:number, price2:number): Promise<QueryResult<dataProduct>> => {
        let query = `select * from product where ${keyword} between ${price1} and ${price2}`;
        return db.query(query);
};

export const filterProduct = (keyword: string, search: string, price1:number, price2:number, sort: string): Promise<QueryResult<dataProduct>> => {
        let query = `select * from product where ${keyword} ilike '%${search}' and price between ${price1} and ${price2} order by id ${sort}`;
        return db.query(query);
};