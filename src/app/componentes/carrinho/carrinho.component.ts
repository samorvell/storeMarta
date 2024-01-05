import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public pedido!: Pedido;
  public empty!: boolean;

  constructor(private route: Router, private carService: CarrinhoService) {

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
    for (i = 0; i < this.pedido.itensPedido.length; i++) {
      if (this.pedido.itensPedido[i].produto.id == idProduto) {
        alert("Remover produto " + this.pedido.itensPedido[i].produto.name)
        this.pedido.valorTotal -= this.pedido.itensPedido[i].precoTotal
        this.pedido.itensPedido.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.pedido))
    this.carService.getNumberOfItens().next(this.pedido.itensPedido.length);

  }
  public efetivar() {
    if (this.pedido.itensPedido.length > 0) {
      this.route.navigate(['/efetivarpedido'])
    }
    else {
      this.route.navigate(['/destaques'])
    }

  }


}
