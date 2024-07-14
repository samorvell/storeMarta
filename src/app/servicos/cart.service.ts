import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService{

  private numberOfItems: BehaviorSubject<number>;

  constructor() {
    super();
    this.numberOfItems = new BehaviorSubject<number>(0);
  }

  // Retorna um Observable para que outros componentes possam se inscrever
  public getNumberOfItems(): Observable<number> {
    return this.numberOfItems.asObservable();
  }

  // Método para obter o valor atual sem ser um Observable
  public getCurrentNumberOfItems(): number {
    return this.numberOfItems.getValue();
  }

  // Define o número de itens no carrinho
  public setNumberOfItems(value: number): void {
    if (value >= 0) {
      this.numberOfItems.next(value);
    } else {
      console.error('Número de itens não pode ser negativo');
    }
  }

  // Incrementa o número de itens no carrinho
  public incrementItems(): void {
    this.numberOfItems.next(this.numberOfItems.getValue() + 1);
  }

  // Decrementa o número de itens no carrinho, mas não permite valores negativos
  public decrementItems(): void {
    const currentValue = this.numberOfItems.getValue();
    if (currentValue > 0) {
      this.numberOfItems.next(currentValue - 1);
    }
  }
}
