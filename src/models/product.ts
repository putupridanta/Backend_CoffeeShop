export interface dataProduct extends IBodyProduct {
    id:number;
    name: string;
    price: number;
    type_product: string;
    description: Text;
    size_product: string;
    stock: number;
    create_at: string;
    update_at: string| null;
}

export interface IproductQuery {
    name?:string;
    price?: number;
    type_product?: string;
    page?:string;
    limit?:string;
}

export interface IBodyProduct {
    name: string;
    price: number;
    type_product: string;
    description: Text;
    size_product: string;
    stock: number;
    create_at: string;
    update_at: string| null;
}