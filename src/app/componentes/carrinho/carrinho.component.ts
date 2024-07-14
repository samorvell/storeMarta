import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/Order';
import { CartService } from 'src/app/servicos/cart.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public pedido!: Order;
  public empty!: boolean;

  constructor(private route: Router, private cartService: CartService) {}

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.pedido = cart ? JSON.parse(cart) : null;

    this.empty = !this.pedido || this.pedido.itemsOrdered.length === 0;

    if (!this.empty) {
      this.cartService.setNumberOfItems(this.pedido.itemsOrdered.length);
    }
  }

  public continuar() {
    this.route.navigate(["/"]);
  }

  public removerItem(idProduto: number) {
    let index = this.pedido.itemsOrdered.findIndex(item => item.product.productId === idProduto);
    if (index > -1) {
      alert(`Remover produto ${this.pedido.itemsOrdered[index].product.name}`);
      this.pedido.amount -= this.pedido.itemsOrdered[index].totalPrice;
      this.pedido.itemsOrdered.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.pedido));
      this.cartService.setNumberOfItems(this.pedido.itemsOrdered.length);
    }

    this.empty = this.pedido.itemsOrdered.length === 0;
  }

  public efetivar() {
    if (this.pedido.itemsOrdered.length > 0) {
      this.route.navigate(['/efetivarpedido']);
    } else {
      this.route.navigate(['/destaques']);
    }
  }
}
