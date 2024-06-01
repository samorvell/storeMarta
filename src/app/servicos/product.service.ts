import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../model/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) { }

  // public getAllProdutos() {
  //   //console.log("Estou no PRODUTOSERVICE - ENTREI EM CONTATO COM O BACK-END")
  //   return this.http.get("http://localhost:8080/product/")
  // }

  /**
   * Método para obter todos os produtos disponíveis.
   */
  public getAllProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // public getProdutoPeloId(id: number): any {
  //   return this.http.get("http://localhost:8080/product/" + id);
  // }

  /**
   * Método para obter um produto pelo ID.
   * @param id - ID do produto
   */
  public getProdutoPeloId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // public getProdutoPorCategoria(idCateg: number) {
  //   return this.http.get("http://localhost:8080/product/category/" + idCateg);
  // }

  /**
   * Método para obter produtos por categoria.
   * @param idCateg - ID da categoria
   */
  public getProdutoPorCategoria(idCateg: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${idCateg}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // public getProdutosPelaPalavraChave(keyword: string) {
  //   return this.http.get("http://localhost:8080/product/search?key=" + keyword);
  // }

  getProdutosPelaPalavraChave(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?key=${keyword}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Método para tratar erros das requisições HTTP.
   * @param error - Erro recebido
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }

}
