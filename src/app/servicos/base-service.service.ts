
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class BaseService {
  protected handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente ou rede
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    // Aqui, em vez de lançar um novo erro, você pode simplesmente retornar o erro
    console.error(errorMessage); // Você pode manter essa linha para logging
    return throwError(() => error); // Retorna o erro original
  }
}
