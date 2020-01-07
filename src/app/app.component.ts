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
  torrent: any;
  isRPCOK: boolean;
  isRPCBad: boolean;
  rpcErrMsg: string;
  openInfo: boolean;
  openMenu: boolean;
  shortMode: boolean;
  focusID: string;
  checkedAll: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService,
    private torrentService: TorrentService
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
    if (el.sbChecked) {
      this.globalService.deleteFromCheckedList(el.id);
    } else {
      this.globalService.addToCheckedList(el.id);
    }
  }

  onUncheckAll() {
    console.log("fired");
    console.log(this.checkedAll);
    this.checkedAll = !this.checkedAll;
    console.log(this.checkedAll);
  }

  onCheckAll() {
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll) {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].sbChecked = true;
        this.globalService.addToCheckedList(this.torrents[i].id);
      }
    } else {
      for (let i = 0; i < this.torrents.length; i++) {
        this.torrents[i].sbChecked = false;
        this.globalService.deleteFromCheckedList(this.torrents[i].id);
      }
    }
  }

  onCloseInfo() {
    this.openInfo = false;
    this.shortMode = false;
    this.focusID = null;
  }

  onOpenMenu() {
    this.openMenu = !this.openMenu;
  }

  ngOnInit() {
    this.dataService.rpc().subscribe(res => {
      if (res.ok == false && res.status != 409) {
        console.log(res);
        this.isRPCBad = true;
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
