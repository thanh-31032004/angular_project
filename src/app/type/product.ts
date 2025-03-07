export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    showProduct: boolean,
}
export type CartItem = {
    product: Product;
    quantity: number;
};
export type Cart = {
    id: string;
    user: string;
    products: CartItem[];
};