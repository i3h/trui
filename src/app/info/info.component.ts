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
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"]
})
export class InfoComponent implements OnInit {
  @Output() closeInfo = new EventEmitter<boolean>();
  @Input() torrent: any;
  activeTab: string = "details";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClickClose() {
    this.closeInfo.emit(true);
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
