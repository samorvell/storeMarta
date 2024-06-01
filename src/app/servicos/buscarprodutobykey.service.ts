import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarprodutobykeyService {

  private keyWordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getKeyWord(): BehaviorSubject<string> {
    return this.keyWordSubject;
  }

  setKeyWord(key: string): void {
    this.keyWordSubject.next(key);
  }
}
