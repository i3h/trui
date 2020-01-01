import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, forkJoin, of, concat, pipe } from "rxjs";
import {
  map,
  catchError,
  take,
  takeLast,
  retry,
  retryWhen
} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CsrfInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let csrfRequest = request.clone({
      headers: new HttpHeaders({
        "X-Transmission-Session-Id": String(
          window.localStorage.getItem("csrf_token")
        )
      })
    });
    return next.handle(csrfRequest).pipe(
      catchError(err => {
        if (err.status == 409) {
          let csrf_token = err.headers.get("X-Transmission-Session-Id");
          window.localStorage.setItem("csrf_token", csrf_token);
          let csrfRequest = request.clone({
            headers: new HttpHeaders({
              "X-Transmission-Session-Id": String(
                window.localStorage.getItem("csrf_token")
              )
            })
          });
          return next.handle(csrfRequest);
        }
      })
    );
  }
}
