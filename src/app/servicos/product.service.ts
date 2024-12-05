import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../model/Product';
import { BaseService } from './base-service.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private apiUrl = 'http://smart-sales-backend-container:8080/product';

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Método para obter todos os produtos disponíveis.
   */
  public getAllProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

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


  /**
  * Método para obter produtos por palavra chave.
  * @param keyword - palavra chave
  */
  getProdutosPelaPalavraChave(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?key=${keyword}`)
      .pipe(
        catchError(this.handleError)
      );
  }



}
