import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPedido } from 'src/app/model/ItemPedido';
import { Pedido } from 'src/app/model/Pedido';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe!: Produto;
  public quantidade: number = 1; // Remova o @Input aqui, pois a quantidade não precisa ser uma entrada de dados

  constructor(private route: ActivatedRoute,
    private service: ProdutoService,
    private nav: Router,
    private carService: CarrinhoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      this.recuperaProduto(parameter["id"]);
    });
  }

  public recuperaProduto(id: number) {
    this.service.getProdutoPeloId(id).subscribe((prod: Produto) => this.produtoDetalhe = prod);
  }

  public adicionarCarrinho() {
    let pedido: Pedido;
    pedido = JSON.parse(localStorage.getItem("cart")!)

    if (!pedido) {
      pedido = new Pedido(); // Crie um novo pedido se não existir no localStorage
      pedido.valorTotal = 0;
      pedido.itensPedido = [];
    }

    let item: ItemPedido = new ItemPedido();
    item.qtdItem = this.quantidade;
    item.produto = this.produtoDetalhe;
    item.precoUnitario = this.produtoDetalhe.preco;
    item.precoTotal = item.precoUnitario * item.qtdItem;

    pedido.itensPedido.push(item);
    pedido.valorTotal = pedido.valorTotal + item.precoTotal;

    localStorage.setItem("cart", JSON.stringify(pedido));
    this.carService.getNumberOfItens().next(pedido.itensPedido.length);

    this.nav.navigate(["carrinho"])
  }
}
