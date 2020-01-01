import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() showUpload = new EventEmitter<any>();

  constructor() {}

  onClickUpload() {
    console.log("onClick fired");
    this.showUpload.emit(true);
  }

  onShown() {
    console.log("onShown fired");
    this.showUpload.emit(false);
  }

  ngOnInit() {}
}
