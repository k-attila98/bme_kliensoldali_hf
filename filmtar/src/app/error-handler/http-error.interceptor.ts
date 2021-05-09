import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
  
export class HttpErrorInterceptor implements HttpInterceptor 
{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) 
                {
                    // kliens oldali hiba
                    errorMessage = `Client side error! Error: ${error.error.message}`;
                }
                else
                {
                    // szerver oldali hiba
                    errorMessage = `Server side errer! Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                window.alert(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}