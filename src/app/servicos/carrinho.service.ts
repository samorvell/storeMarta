import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private numberOfItens!: BehaviorSubject<number>;

  constructor() {
    this.numberOfItens = new BehaviorSubject<number>(0);
  }

  public getNumberOfItens() {
    return this.numberOfItens;
  }

  public setNumberOfItens(value: number) {
    this.numberOfItens.next(value);
  }



}
