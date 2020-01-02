import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() changeShowUpload = new EventEmitter<any>();
  openUpload: boolean;

  constructor() {}

  onClickUpload() {
    this.openUpload = true;
  }

  onCloseUpload() {
    this.openUpload = false;
  }

  ngOnInit() {}
}
