import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  API_ENDPOINT: string = "http://seedbox/transmission/rpc";
  checkedList: string[] = [];

  constructor() {}

  addToCheckedList(id: string) {
    let index = this.checkedList.indexOf(id);
    if (index == -1) this.checkedList.push(id);
  }

  deleteFromCheckedList(id: string) {
    let index = this.checkedList.indexOf(id);
    if (index !== -1) this.checkedList.splice(index, 1);
  }
}
