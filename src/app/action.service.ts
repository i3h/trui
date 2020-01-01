import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin, of, concat, pipe } from "rxjs";
import {
  map,
  catchError,
  take,
  takeLast,
  retry,
  retryWhen,
  delay,
  tap,
  mergeMap,
  concatMap,
  repeat
} from "rxjs/operators";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  uploadTorrents(data: string): Observable<any> {
    let url = this.globalService.API_ENDPOINT;
    return this.http.post(url, data).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }
}
