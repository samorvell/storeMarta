import { Category } from "./Category";

export class Product {

    public productId!: number;
    public name!: string;
    public details!: string;
    public linkPhoto!: string;
    public price!: number;
    public isAvailable!: number;
    public category!: Category;


}