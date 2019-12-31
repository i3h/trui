import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, of, pipe } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  testRpc(data: string): Observable<any> {
    let url = this.globalService.API_ENDPOINT;
    console.log("csrf_token: ", window.localStorage.getItem("csrf_token"));
    let csrf_token = String(window.localStorage.getItem("csrf_token"));
    let headers = new HttpHeaders({
      "X-Transmission-Session-Id": csrf_token
    });
    console.log("headers: ", headers.get("X-Transmission-Session-Id"));
    return this.http.post(url, data, { headers: headers }).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        if (err.status == 409) {
          let token = err.headers.get("X-Transmission-Session-Id");
          window.localStorage.setItem("csrf_token", token);
          let headers = new HttpHeaders({
            "X-Transmission-Session-Id": window.localStorage.getItem(
              "csrf_token"
            )
          });
          return this.http.post(url, data, { headers: headers }).pipe(
            map((res: Response) => {
              return res;
            }),
            catchError(err => {
              if (err.status == 409) {
                return of(null);
              } else {
                return of(null);
              }
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }
}
