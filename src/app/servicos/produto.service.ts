import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public getAllProdutos() {
    console.log("Estou no PRODUTOSERVICE - ENTREI EM CONTATO COM O BACK-END")
    return this.http.get("http://localhost:8080/produto/")
  }

  public getProdutoPeloId(id: number): any {
    return this.http.get("http://localhost:8080/produto/" + id);
  }

}
