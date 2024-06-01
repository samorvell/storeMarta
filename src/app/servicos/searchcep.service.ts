import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchCepService {

  constructor(private http: HttpClient) { }

  public buscarCEP(cep: string) {
    return this.http.get("http://viacep.com.br/ws/" + cep + "/json");
  }
}
