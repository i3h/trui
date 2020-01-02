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
  @Output() closeSetting = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  @HostListener("document:keydown", ["$event"])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.closeSetting.emit(true);
    }
  }

  onClickBackground() {
    this.closeSetting.emit(true);
  }

  onClickClose() {
    this.closeSetting.emit(true);
  }

  cancel() {
    this.closeSetting.emit(true);
  }

  ngOnInit() {}
}
