import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get("/appConfig.json")
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getConfig() {
    return this.appConfig;
  }

  getAPI() {
    let api = window.localStorage.getItem("rpcAddr");
    if (api == "" || api == null || api == undefined) {
      api = this.getConfig().api;
      return api;
    }
    return api;
  }
}
