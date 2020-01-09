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
  selector: "app-actions",
  templateUrl: "./actions.component.html",
  styleUrls: ["./actions.component.css"]
})
export class ActionsComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 1024;
  @Output() actionEnd = new EventEmitter<any>();
  @Input() action: string;
  @Input() torrents: any;
  @Input() openMenu: boolean;

  constructor(
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

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

  onClose() {
    this.action = null;
    this.actionEnd.emit();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}
}
