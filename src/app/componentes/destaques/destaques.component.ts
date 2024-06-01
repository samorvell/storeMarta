import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/servicos/product.service';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaquesComponent implements OnInit {

  public lista!: Product[];
  //ITEM: any;

  //preciso injetar o serviço que busca o produto
  constructor(private service: ProductService) {

  }

  ngOnInit(): void {
    this.service.getAllProdutos()
      .subscribe((res: Object) => { // <- Alterado para 'Object' ou o tipo correto dos dados recebidos
        this.lista = res as Product[]; // <- Conversão explícita para o tipo 'Produto[]'
      },
        err => console.log(err));

  }
}