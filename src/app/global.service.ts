import { Injectable } from "@angular/core";
import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  VERSION = this.appConfigService.getConfig().version;

  checkList: string[] = [];

  constructor(private appConfigService: AppConfigService) {}

  addToCheckList(id: string) {
    let index = this.checkList.indexOf(id);
    if (index == -1) this.checkList.push(id);
  }

  deleteFromCheckList(id: string) {
    let index = this.checkList.indexOf(id);
    if (index !== -1) this.checkList.splice(index, 1);
  }
}
