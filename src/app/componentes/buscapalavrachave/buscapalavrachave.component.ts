import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { BuscarprodutobykeyService } from 'src/app/servicos/buscarprodutobykey.service';
import { ProductService } from 'src/app/servicos/product.service';

@Component({
  selector: 'app-buscapalavrachave',
  templateUrl: './buscapalavrachave.component.html',
  styleUrls: ['./buscapalavrachave.component.css']
})
export class BuscapalavrachaveComponent implements OnInit {

  public keyWord: string = '';
  public lista: Product[] = [];

  constructor(private busca: BuscarprodutobykeyService,
    private service: ProductService) { }


  private searchProductsByKeyWord(): void {
    if (this.keyWord) {
      this.service.getProdutosPelaPalavraChave(this.keyWord).subscribe(
        (res: Product[]) => {
          this.lista = res;
        },
        error => {
          console.error('Erro ao buscar produtos', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.busca.getKeyWord().subscribe(
      (res: string) => {
        this.keyWord = res;
        this.searchProductsByKeyWord();
      }
    );
  }
}
