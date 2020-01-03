import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { GlobalService } from "../global.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  openUpload: boolean;
  openDelete: boolean;
  openSetting: boolean;

  constructor(
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClickStart() {
    console.log("start");
    if (this.globalService.checkedList.length > 0) {
      let data = {
        ids: this.globalService.checkedList
      };
      this.dataService.startTorrents(data).subscribe(res => {
        //console.log(res);
      });
      // clear checked list
      this.globalService.checkedList = [];
    }
    return;
  }

  onClickStop() {
    console.log("stop");
    if (this.globalService.checkedList.length > 0) {
      let data = {
        ids: this.globalService.checkedList
      };
      this.dataService.stopTorrents(data).subscribe(res => {
        //console.log(res);
      });
      // clear checked list
      this.globalService.checkedList = [];
    }
    return;
  }

  onClickUpload() {
    this.openUpload = true;
  }

  onCloseUpload() {
    this.openUpload = false;
  }

  onClickDelete() {
    this.openDelete = true;
  }

  onCloseDelete() {
    this.openDelete = false;
  }

  onClickSetting() {
    this.openSetting = true;
  }

  onCloseSetting() {
    this.openSetting = false;
  }

  ngOnInit() {}
}
