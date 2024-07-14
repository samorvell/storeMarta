import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from 'src/app/model/Client';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService{

  private apiUrl = "http://localhost:8080/client";

  constructor(private http: HttpClient) {
    super();
  }

  public buscarClientePeloCpf(cpf: string): Observable<Client> {
    const url = `${this.apiUrl}/${cpf}`;
    return this.http.get<Client>(url).pipe(
      catchError(this.handleError)
    );
  }

}
