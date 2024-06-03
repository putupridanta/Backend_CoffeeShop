export interface dataUsers extends IBodyUser, profileQuery {
    id:number;
    uid_user: string;
    phone: number;
    email: string;
    password: string;
    role: number;
    create_at: string;
    update_at?: string| null;
}

export interface IusersQuery {
    email?: string;
    page?: string;
    limit?: string;
}

export interface profileQuery {
    user_id: string;
    firstname: string;
    lastname: string;
    display_name: string;
    address: string;
}

export interface IBodyUser {
    uid_user: string;
    phone?: number;
    email?: string;
    role?: number;
}

export interface IRegisterBodyUser extends IBodyUser{
    password: string;
}

export interface IuserLoginBody{
    email: string;
    password: string;
}

export interface IdataProfile{
    firstname?:string;
    lastname?:string;
    displayname?:string;
    address?:string;
    image?:string | null;
    user_id:string;
}

export interface IBodyProfile{
    firstname:string;
    lastname:string;
    displayname:string;
    address?:string;
}

export interface IUsersParams{
    email:string;
}

