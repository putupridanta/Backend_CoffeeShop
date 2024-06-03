import { QueryResult } from "pg";
import db from "../configs/pg";
import { dataUsers, IBodyUser, profileQuery, IusersQuery, IdataProfile, IBodyProfile } from "../models/users";
import { query } from "express";
import { hash } from "bcrypt";

export const createUsers = (body: IBodyUser): Promise<QueryResult<dataUsers>> => {
        let query = `insert into users (phone, email, password, role) 
        values ($1,$2,$3,$4) returning*`;
        const { phone, email, role } = body;
        const values = [phone, email, role];
        return db.query(query, values);
}

export const updateUsers = (
        {firstname,
        lastname,
        displayname,
        address,
        }: IBodyProfile, user_id:string, imgUrl?: string,
        ): Promise<QueryResult<IdataProfile>> => {

        let values:(string | null)[] = [user_id];
        let filtered: { [key: string]: undefined | string } = {};
        
        let obj: { [key: string]: undefined | string } = {
                imgUrl,
                firstname,
                lastname,
                displayname,
                address 
        };

        for (let x of Object.keys(obj)) {
                if (obj[x]) {
                        filtered[x] = obj[x];
                        values.push(obj[x] as string);
                        if (imgUrl) values.push(`/imgs/${imgUrl}`);
                        if (!imgUrl) values.push(null);
                }
        }
        const key = Object.keys(filtered);
        const finalResult = key.map((o, ind): string => `${o}=$${ind + 2}`);
        const query = `UPDATE profile SET ${finalResult} WHERE user_id = $1 RETURNING *`;
        
        return db.query(query, values)
}

export const deleteUsers = (uid_user: string): Promise<QueryResult<dataUsers>> => {
        const query = `delete from users where uid_user = $1`;
        const values = [uid_user];
        return db.query(query, values);
}

export const getAllUsers = ({
        email,
        page,
        limit,
}: IusersQuery): Promise<QueryResult<dataUsers>> => {
        let query = `select * from users`;
        const values = [];
        if (email) {
                query += "where email ilike $1"
                values.push(`%${email}%`)
        }
        query += " order by id asc";

        if (page && limit) {
                const pageLimit = parseInt(limit);
                const offset = (parseInt(page) - 1) * pageLimit;
                query += ` limit $${values.length + 1} offset $${values.length + 2}`;
                values.push(pageLimit, offset);
        }
        return db.query(query, values);
}

export const getOneUsers = (uid_user: string): Promise<QueryResult<dataUsers>> => {
        const query = `select * from users where uid_user = $1`;
        const values = [uid_user];
        return db.query(query, values);
}

export const registerUser = (body: IBodyUser, hashedPassword: string): Promise<QueryResult<dataUsers>> => {
        let query = `insert into users (email, phone, password) 
        values ($1,$2,$3) returning email, phone`;
        const { email, phone } = body;
        const values = [email, phone, hashedPassword];
        console.log(values);
        
        return db.query(query, values);
}

export const changepwd = (body: IBodyUser, hashedPassword: string): Promise<QueryResult<dataUsers>> => {
        let query = `UPDATE users SET password = $1 WHERE email = $2`;
        const { email, phone, role } = body;
        const values = [email, phone, role, hashedPassword];
        
        return db.query(query, values);
}

export const getloginUser = (email: string): Promise<QueryResult<{ uid_user: string; password: string }>> => {
        const query = `select uid_user, password from users where email = $1`;
        const values = [email];
        return db.query(query, values);
}

export const getProfile = (): Promise<QueryResult<profileQuery>> => {
        const query = `select id, CONCAT(p.firstname, ' ', p.lastname) as "Full NAME", u.email, u.phone, p.adress as "alamat"
        FROM users u
        JOIN profile p 
        ON p.user_id = u.id`
        return db.query(query);
}

export const setImageProfile = (user_id: string, imgUrl?: string): Promise<QueryResult<IdataProfile>> => {
        let query = `update profile set image= $1 where user_id = $2 returning user_id, image`
        const values: (string | null)[] = [];
        if (imgUrl) values.push(`/imgs/${imgUrl}`);
        if (!imgUrl) values.push(null);
        values.push(user_id);
        return db.query(query, values);
}
