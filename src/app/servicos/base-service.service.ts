import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

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
    console.error(errorMessage);
    return throwError(() => new Error('Ocorreu um erro; por favor, tente novamente mais tarde.'));
  }
}
