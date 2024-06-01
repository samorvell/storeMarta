import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public inserirNovoPedido(pedido: Order) {
    console.log(pedido)
    return this.http.post("http://localhost:8080/order", pedido);
  }
}