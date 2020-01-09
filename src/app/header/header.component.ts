import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "../global.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 1024;
  @Output() action = new EventEmitter<any>();
  @Input() torrents: any;
  @Input() openMenu: boolean;
  filesNum: number;
  rateText: string;
  rateColor: string;

  constructor(
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  setRateText() {
    let d = 0;
    let u = 0;
    for (let i = 0; i < this.torrents.length; i++) {
      d += this.torrents[i].rateDownload;
      u += this.torrents[i].rateUpload;
    }
    if (d != 0 || u != 0) {
      this.rateColor = "green";
    } else {
      this.rateColor = "";
    }
    this.rateText = " | D " + this.addUnit(d) + "/s";
    this.rateText += " | U " + this.addUnit(u) + "/s";
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

  onClickStart() {
    //console.log("start");
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
    location.reload();
  }

  onClickStop() {
    //console.log("stop");
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
    location.reload();
  }

  onClickUpload() {
    this.action.emit("upload");
  }

  onClickDelete() {
    this.action.emit("delete");
  }

  onClickSetting() {
    this.action.emit("setting");
  }

  onClickAbout() {
    this.action.emit("about");
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["torrents"] && typeof this.torrents !== "undefined") {
      this.filesNum = this.torrents.length;
      this.setRateText();
    }
  }
}
