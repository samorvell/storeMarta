import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { Order } from 'src/app/model/Order';
import { BuscarprodutobykeyService } from 'src/app/servicos/buscarprodutobykey.service';
import { CartService } from 'src/app/servicos/cart.service';
import { CategoryService } from 'src/app/servicos/category.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public lista!: Category[];
  public numItens!: number;
  private pedido!: Order;
  public keyword: string = "";

  constructor(private service: CategoryService,
    private carService: CartService,
    private busca: BuscarprodutobykeyService,
    private route: Router) {

    this.numItens = 0;
  }

  ngOnInit(): void {

    this.numItens = 0;
    this.pedido = JSON.parse(localStorage.getItem("cart")!)

    if (this.pedido) {
      this.numItens = this.pedido.itemsOrdered.length;
    }

    this.service.getAllCategorias()
      .subscribe((res: Object) => { // <- Alterado para 'Object' ou o tipo correto dos dados recebidos
        this.lista = res as Category[]; // <- Conversão explícita para o tipo 'Produto[]'
      },
        err => console.log(err));

    this.carService.getNumberOfItems().subscribe(
      (res: number) => { this.numItens = res; }
    );

  }

  public buscar() {
    //console.log(this.keyword);
    if (this.keyword) {
      console.log("nvabar = " + this.keyword);
      this.busca.setKeyWord(this.keyword);
      this.route.navigate(['/busca']);
    }

  }

}
