import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from 'src/app/model/Client';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  private apiUrl = "http://smart-sales-backend-container:8080/client";

  constructor(private http: HttpClient) {
    super();
  }

  buscarClientePeloCpf(cpf: string): Observable<any> {
    return this.http.get(`/api/clientes/${cpf}`).pipe(
      catchError(this.handleError.bind(this)) // Aqui chamamos o handleError
    );
  }

}
