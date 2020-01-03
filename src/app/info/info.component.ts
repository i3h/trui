import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"]
})
export class InfoComponent implements OnInit {
  activeTab: string = "charts";

  constructor() {}

  onClickCharts() {
    this.activeTab = "charts";
  }

  onClickDetails() {
    this.activeTab = "details";
  }

  onClickPeers() {
    this.activeTab = "peers";
  }

  onClickTrackers() {
    this.activeTab = "trackers";
  }

  onClickFiles() {
    this.activeTab = "files";
  }

  ngOnInit() {}
}
