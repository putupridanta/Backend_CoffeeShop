export interface dataPromo extends IBodyPromo {
    id:number;
    promo_kode: string;
    product_id: number;
    discount: number;
    create_at: string;
}

export interface IBodyPromo {
    promo_kode: string;
    product_id: number;
    discount: number;
    create_at: string;
}