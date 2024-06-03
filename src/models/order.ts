export interface dataOrder extends IBodyOrder {
    id:number;
    user_id: number;
    product_id: number;
    promo_id: number;
    no_order: string;
    create_at: string;
    update_at: string | null;
}

export interface IOrderQuery {
    user_id?:string;
    product_id?: string;
    promo_id?: string;
    no_order?: string;
    page?:string;
    limit?:string;
}

export interface IBodyOrder {
    user_id: number;
    product_id: number;
    promo_id: number;
    no_order: string;
    create_at: string;
    update_at: string | null;
}