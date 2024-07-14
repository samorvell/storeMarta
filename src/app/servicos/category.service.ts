import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/app/model/Category';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService{

  private apiUrl = "http://localhost:8080/category";

  constructor(private http: HttpClient) {
    super();
  }

  public getAllCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  
}
