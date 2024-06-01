import { Client } from "./Client";
import { itemsOrdered } from "./itemsOrdered";

/*Aqui fazemos o pedido, porem funciona como o carrinho de compras */
export class Order {
    public idPedido!: number;
    public status!: number;
    public client!: Client;
    public itemsOrdered!: itemsOrdered[];
    public amount!: number;
    public comments!: string;


}