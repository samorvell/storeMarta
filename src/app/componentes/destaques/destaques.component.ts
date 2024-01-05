import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaquesComponent implements OnInit {

  public lista!: Produto[];
  //ITEM: any;

  //preciso injetar o serviço que busca o produto
  constructor(private service: ProdutoService) {

  }

  ngOnInit(): void {
    this.service.getAllProdutos()
      .subscribe((res: Object) => { // <- Alterado para 'Object' ou o tipo correto dos dados recebidos
        this.lista = res as Produto[]; // <- Conversão explícita para o tipo 'Produto[]'
      },
        err => console.log(err));

  }
}