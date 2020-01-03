import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "./global.service";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  torrents: any;
  torrent: any;
  isRoot: boolean = window.location.pathname == "/" ? true : false;
  isMobile: boolean = window.innerWidth < 770;
  isRPCOK: boolean;
  isRPCBad: boolean;
  openInfo: boolean;
  shortMode: boolean;
  focusID: string;
  checkedAll: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onFocus(id: any) {
    this.openInfo = true;
    this.shortMode = true;
    this.focusID = id;
    for (let i = 0; i < this.torrents.length; i++) {
      if (this.torrents[i].id == id) {
        this.torrent = this.torrents[i];
      }
    }
  }

  onCheck(el: any) {
    if (el.checked) {
      this.globalService.deleteFromCheckedList(el.id);
    } else {
      this.globalService.addToCheckedList(el.id);
    }
  }

  onCheckAll() {
    console.log("main checkedall: ", this.checkedAll);
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll) {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].checked = true;
        this.globalService.addToCheckedList(this.torrents[i].id);
      }
    } else {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].checked = false;
        this.globalService.deleteFromCheckedList(this.torrents[i].id);
      }
    }
  }

  onCloseInfo() {
    this.openInfo = false;
    this.shortMode = false;
    this.focusID = null;
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
      if (this.globalService.checkedList.includes(this.torrents[i].id)) {
        this.torrents[i].checked = true;
      } else {
        this.torrents[i].checked = false;
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

  ngOnInit() {
    this.dataService.rpc().subscribe(res => {
      if (res.status == 502) {
        this.isRPCBad = true;
        //console.log("502 error");
      } else {
        this.isRPCOK = true;
        this.dataService.getTorrents().subscribe(res => {
          if (res != null && res.result == "success") {
            this.torrents = res.arguments.torrents;
            this.refreshTorrents();
          }
        });
        this.dataService.getSession().subscribe(res => {
          //console.log(res)
          if (res != null && res.result == "success") {
            /*
            this.session= res.arguments.torrents;
            this.change.emit(this.torrents);
						*/
          }
        });
      }
    });
  }
}
