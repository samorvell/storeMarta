import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from 'src/app/model/Order';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  private apiUrl = "http://localhost:8080/order";

  constructor(private http: HttpClient) {
    super();
  }

  public inserirNovoPedido(pedido: Order): Observable<{ idOrder: number }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ idOrder: number }>(this.apiUrl, pedido, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  
}
