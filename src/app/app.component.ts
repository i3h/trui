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
import { TorrentService } from "./torrent.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 1024;
  torrents: any;
  globalStats: any;
  action: string;
  isRPCOK: boolean;
  rpcErrMsg: string;
  openInfo: boolean;
  shortList: boolean;
  focusID: string;
  isCheckAll: boolean;
  filterName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService,
    private torrentService: TorrentService
  ) {}

  onFireAction(e) {
    //console.log(e);
    this.action = e;
  }

  onFireFilter(e) {
    console.log(e);
    this.filterName = e;
    window.localStorage.setItem("filterName", e);
    location.reload();
  }

  onEndAction(e) {
    console.log(e);
    this.action = null;
  }

  onFocus(id: any) {
    this.openInfo = true;
    this.shortList = true;
    this.focusID = id;
  }

  onCheck(el: any) {
    if (el.sbCheck) {
      this.globalService.deleteFromCheckList(el.id);
    } else {
      this.globalService.addToCheckList(el.id);
    }
  }

  onUncheckAll() {
    this.isCheckAll = !this.isCheckAll;
  }

  onCheckAll() {
    this.isCheckAll = !this.isCheckAll;
    if (this.isCheckAll) {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].sbCheck = true;
        this.globalService.addToCheckList(this.torrents[i].id);
      }
    } else {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].sbCheck = false;
        this.globalService.deleteFromCheckList(this.torrents[i].id);
      }
    }
  }

  onCloseInfo() {
    this.openInfo = false;
    this.shortList = false;
    this.focusID = null;
  }

  ngOnInit() {
    // set filter name
    this.filterName = window.localStorage.getItem("filterName");
    this.filterName = null ? "All" : this.filterName;
    // fetch torrents data
    this.dataService.rpc().subscribe(res => {
      if (res.ok == false && res.status != 409) {
        console.log(res);
        this.rpcErrMsg = res.message;
      } else {
        this.isRPCOK = true;
        this.dataService.getTorrents().subscribe(res => {
          if (res != null && res.result == "success") {
            this.torrents = res.arguments.torrents;
            for (let i = 0; i < this.torrents.length; i++) {
              this.torrents[i] = this.torrentService.addMoreAttr(
                this.torrents[i]
              );
            }
            this.globalStats = this.torrentService.getGlobalStats(
              this.torrents
            );
            this.torrents = this.torrentService.filter(
              this.torrents,
              this.filterName
            );
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
