import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/servicos/product.service';

@Component({
  selector: 'app-buscacategoria',
  templateUrl: './buscacategoria.component.html',
  styleUrls: ['./buscacategoria.component.css']
})
export class BuscacategoriaComponent implements OnInit {

  public lista: Product[] = [];
  public idCategoria!: number;

  constructor(private router: ActivatedRoute, private service: ProductService) {
    this.router.params.subscribe((parameters) => {
      this.idCategoria = parameters["id"];  // Corrigido aqui
      //console.log("Selecionei a categoria: " + this.idCategoria);
      this.idCategoria = parameters["id"]
      this.buscarPorCategoria();
    });
  }

  ngOnInit(): void {
  }

  public buscarPorCategoria() {
    this.service.getProdutoPorCategoria(this.idCategoria)
      .pipe(
        catchError((error) => {
          console.error('Erro ao recuperar por categoria:', error);
          throw error;
        })
      )
      .subscribe({
        next: (res: Product[]) => {
          this.lista = res;
        },
        error: (err: any) => {
          console.error('Erro durante a assinatura:', err);
        }
      } as any);
  }
}
