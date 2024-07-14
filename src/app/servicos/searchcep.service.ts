import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class SearchCepService extends BaseService {

/*nota Template Literals: A URL é construída usando template literals (${}), o que torna o código mais legível.
*/

  private apiUrl = "http://viacep.com.br/ws";

  constructor(private http: HttpClient) {
    super();
  }

  public buscarCEP(cep: string): Observable<any> {
    const url = `${this.apiUrl}/${cep}/json`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }


}
