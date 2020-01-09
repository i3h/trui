import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  HostListener
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "../../global.service";
import { DataService } from "../../data.service";

const ESCAPE = 27;

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  activeTab: string = "rpc";
  settings = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClickRPC() {
    this.activeTab = "rpc";
  }

  onClickTorrents() {
    this.activeTab = "torrents";
  }

  onClickSpeed() {
    this.activeTab = "speed";
  }

  onClickPeers() {
    this.activeTab = "peers";
  }

  onClickNetwork() {
    this.activeTab = "network";
  }

  @HostListener("document:keydown", ["$event"])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.close.emit(true);
    }
  }

  onClickBackground() {
    this.close.emit(true);
  }

  onClickClose() {
    this.close.emit(true);
  }

  cancel() {
    this.close.emit(true);
  }

  save() {
    console.log("fired");
    this.close.emit(true);
  }

  ngOnInit() {}
}
