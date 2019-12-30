import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, pipe } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  testRpc(data: string): Observable<any> {
    let url = this.globalService.API_ENDPOINT;
    return this.http.post(url, data).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(error => of(null))
    );
  }
}
