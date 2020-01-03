import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "../global.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  @Input() torrents: any;
  checkedAll: boolean;
  checkedList: string[] = [];
  focused: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClick(el) {
    this.focused = el.id;
  }

  translateStatusCode() {
    for (let i = 0; i < this.torrents.length; i++) {
      if (this.torrents[i].status == 0) {
        this.torrents[i].status = "Stopped";
      } else if (this.torrents[i].status == 1) {
        this.torrents[i].status = "Queued to check";
      } else if (this.torrents[i].status == 2) {
        this.torrents[i].status = "Checking";
      } else if (this.torrents[i].status == 3) {
        this.torrents[i].status = "Queued to download";
      } else if (this.torrents[i].status == 4) {
        this.torrents[i].status = "Downloading";
      } else if (this.torrents[i].status == 5) {
        this.torrents[i].status = "Queued to seed";
      } else if (this.torrents[i].status == 6) {
        this.torrents[i].status = "Seeding";
      }
    }
  }

  addUnit(num) {
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(2).toString() + " GB";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2).toString() + " MB";
    } else if (num > 1000) {
      return (num / 1000).toFixed(2).toString() + " KB";
    } else {
      return num.toString() + " B";
    }
  }

  setSizeText() {
    for (let i = 0; i < this.torrents.length; i++) {
      this.torrents[i].sizeText = this.addUnit(this.torrents[i].totalSize);
    }
  }

  translateUploadedEver() {
    for (let i = 0; i < this.torrents.length; i++) {
      this.torrents[i].uploadedEver = this.addUnit(
        this.torrents[i].uploadedEver
      );
    }
  }

  calUploadRatio() {
    for (let i = 0; i < this.torrents.length; i++) {
      this.torrents[i].uploadRatio = this.torrents[i].uploadRatio
        .toFixed(2)
        .toString();
    }
  }

  setCheckedStatus() {
    for (let i = 0; i < this.torrents.length; i++) {
      if (this.checkedList.includes(this.torrents[i].hashString)) {
        this.torrents[i].checked = true;
      } else {
        this.torrents[i].checked = false;
      }
    }
  }

  clickCheck(el: any) {
    if (el.checked) {
      //el.checked = false;
      this.checkedList = this.removeHash(this.checkedList, el.hashString);
    } else {
      //el.checked = true;
      this.checkedList = this.addHash(this.checkedList, el.hashString);
    }
  }

  addHash(list: string[], hash: string) {
    let index = list.indexOf(hash);
    if (index == -1) list.push(hash);
    return list;
  }

  removeHash(list: string[], hash: string) {
    let index = list.indexOf(hash);
    if (index !== -1) list.splice(index, 1);
    return list;
  }

  checkAll() {
    if (this.checkedAll) {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].checked = false;
        this.checkedList = this.removeHash(
          this.checkedList,
          this.torrents[i].hashString
        );
      }
    } else {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].checked = true;
        this.checkedList = this.addHash(
          this.checkedList,
          this.torrents[i].hashString
        );
      }
    }
  }

  setProgressValue() {
    for (let i = 0; i < this.torrents.length; i++) {
      let value = Math.ceil(
        (this.torrents[i].downloadedEver / this.torrents[i].totalSize) * 100
      );
      if (value < 100) {
        this.torrents[i].progressValue = value;
      } else {
        this.torrents[i].progressValue = 100;
      }
    }
  }

  setProgressText() {
    for (let i = 0; i < this.torrents.length; i++) {
      this.torrents[i].progressText = this.torrents[i].progressValue + "%";
    }
  }

  setProgressColor() {
    for (let i = 0; i < this.torrents.length; i++) {
      if (this.torrents[i].status == "Downloading") {
        this.torrents[i].progressColor = "is-success";
      } else if (this.torrents[i].status == "Seeding") {
        this.torrents[i].progressColor = "is-info";
      } else {
        this.torrents[i].progressColor = "";
      }
    }
  }

  setStatusColor() {
    for (let i = 0; i < this.torrents.length; i++) {
      if (this.torrents[i].status == "Downloading") {
        this.torrents[i].statusColor = "green";
      } else if (this.torrents[i].status == "Seeding") {
        this.torrents[i].statusColor = "#23A1D8";
      } else {
        this.torrents[i].statusColor = "";
      }
    }
  }

  setRateText() {
    for (let i = 0; i < this.torrents.length; i++) {
      if (
        this.torrents[i].rateDownload != 0 ||
        this.torrents[i].rateUpload != 0
      ) {
        this.torrents[i].rateColor = "green";
      }
      this.torrents[i].rateText =
        "D " + this.addUnit(this.torrents[i].rateDownload) + "/s";
      this.torrents[i].rateText +=
        " | U " + this.addUnit(this.torrents[i].rateUpload) + "/s";
    }
  }

  refreshTorrents() {
    this.setCheckedStatus();
    this.translateStatusCode();
    this.setSizeText();
    this.translateUploadedEver();
    this.calUploadRatio();
    this.setProgressValue();
    this.setProgressText();
    this.setProgressColor();
    this.setStatusColor();
    this.setRateText();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["torrents"] && typeof this.torrents !== "undefined") {
      this.refreshTorrents();
    }
  }
}
