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
  openInfo: boolean;
  openMenu: boolean;
  shortMode: boolean;
  focusID: string;
  checkedAll: boolean = false;

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

  onOpenMenu() {
    this.openMenu = !this.openMenu;
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
