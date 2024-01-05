import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { CategoriaService } from 'src/app/servicos/categoria.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public lista!: Categoria[];
  public numItens!: number;
  private pedido!: Pedido;

  constructor(private service: CategoriaService, private carService: CarrinhoService) {

    this.numItens = 0;
  }

  ngOnInit(): void {

    this.numItens = 0;
    this.pedido = JSON.parse(localStorage.getItem("cart")!)

    if (this.pedido) {
      this.numItens = this.pedido.itensPedido.length;
    }

    this.service.getAllCategorias()
      .subscribe((res: Object) => { // <- Alterado para 'Object' ou o tipo correto dos dados recebidos
        this.lista = res as Categoria[]; // <- Conversão explícita para o tipo 'Produto[]'
      },
        err => console.log(err));

    this.carService.getNumberOfItens().subscribe(
      (res: number) => { this.numItens = res; }
    );

  }

}
