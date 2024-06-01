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

  constructor(private route: Router, private carService: CartService) {

  }

  public continuar() {
    this.route.navigate(["/"]);
  }

  ngOnInit(): void {

    this.pedido = JSON.parse(localStorage.getItem('cart')!)

    if (!this.pedido) {
      this.empty = true;
    } else {


      this.empty = false;

    }

  }

  public removerItem(idProduto: number) {

    let i: number;
    for (i = 0; i < this.pedido.itemsOrdered.length; i++) {
      if (this.pedido.itemsOrdered[i].product.productId == idProduto) {
        alert("Remover produto " + this.pedido.itemsOrdered[i].product.name)
        this.pedido.amount -= this.pedido.itemsOrdered[i].totalPrice
        this.pedido.itemsOrdered.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.pedido))
    this.carService.getNumberOfItens().next(this.pedido.itemsOrdered.length);

  }
  public efetivar() {
    if (this.pedido.itemsOrdered.length > 0) {
      this.route.navigate(['/efetivarpedido'])
    }
    else {
      this.route.navigate(['/destaques'])
    }

  }


}
