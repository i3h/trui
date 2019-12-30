import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  constructor() {}

  API_ENDPOINT: string = "http://localhost:9091/transmission/rpc/";
}
