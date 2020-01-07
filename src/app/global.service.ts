import { Injectable } from "@angular/core";
import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  VERSION = this.appConfigService.getConfig().version;

  checkedList: string[] = [];

  constructor(private appConfigService: AppConfigService) {}

  addToCheckedList(id: string) {
    let index = this.checkedList.indexOf(id);
    if (index == -1) this.checkedList.push(id);
  }

  deleteFromCheckedList(id: string) {
    let index = this.checkedList.indexOf(id);
    if (index !== -1) this.checkedList.splice(index, 1);
  }
}
