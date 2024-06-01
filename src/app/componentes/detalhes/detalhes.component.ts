import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { itemsOrdered } from 'src/app/model/itemsOrdered';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/servicos/cart.service';
import { ProductService } from 'src/app/servicos/product.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe!: Product;
  public quantidade: number = 1; // Remova o @Input aqui, pois a quantidade não precisa ser uma entrada de dados

  constructor(private route: ActivatedRoute,
    private service: ProductService,
    private nav: Router,
    private carService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      this.recuperaProduto(parameter["id"]);
    });
  }

  public recuperaProduto(id: number) {
    this.service.getProdutoPeloId(id).subscribe((prod: Product) => this.produtoDetalhe = prod);
  }

  public adicionarCarrinho() {
    let pedido: Order;
    pedido = JSON.parse(localStorage.getItem("cart")!)

    if (!pedido) {
      pedido = new Order(); // Crie um novo pedido se não existir no localStorage
      pedido.amount = 0;
      pedido.itemsOrdered = [];
    }

    let item: itemsOrdered = new itemsOrdered();
    item.itemQty = this.quantidade;
    item.product = this.produtoDetalhe;
    item.unitPrice = this.produtoDetalhe.price;
    item.totalPrice = item.unitPrice * item.itemQty;

    pedido.itemsOrdered.push(item);
    pedido.amount = pedido.amount + item.totalPrice;

    localStorage.setItem("cart", JSON.stringify(pedido));
    this.carService.getNumberOfItens().next(pedido.itemsOrdered.length);

    this.nav.navigate(["carrinho"])
  }
}
