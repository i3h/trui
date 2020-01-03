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
