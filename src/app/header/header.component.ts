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
  @Output() filter = new EventEmitter<any>();
  @Input() globalStats: any;
  @Input() openMenu: boolean;
  @Input() filterName: string;
  openFilter: boolean = false;

  constructor(
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClickStart() {
    this.action.emit("start");
  }

  onClickStop() {
    this.action.emit("stop");
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

  onClickFilter() {
    this.openFilter = !this.openFilter;
  }

  onSelectFilter(g) {
    this.filterName = g;
    this.filter.emit(g);
  }

  ngOnInit() {}
}
