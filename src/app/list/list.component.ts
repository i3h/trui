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
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 1024;
  @Output() focus = new EventEmitter<any>();
  @Output() check = new EventEmitter<any>();
  @Output() checkAll = new EventEmitter<any>();
  @Input() torrents: any;
  @Input() shortMode: any;
  @Input() focusID: string;
  @Input() checkedAll: boolean;
  clickCount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClick(el) {
    if (this.focusID == null) {
      this.clickCount++;
      if (this.clickCount > 1) {
        this.focus.emit(el.id);
      } else {
        setTimeout(() => {
          this.clickCount = 0;
        }, 500);
      }
    } else {
      this.focus.emit(el.id);
    }
  }

  onClickCheck(el: any) {
    this.check.emit(el);
  }

  onCheckAll() {
    this.checkAll.emit();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["checkedAll"] && typeof this.checkedAll !== "undefined") {
      this.checkedAll = !this.checkedAll;
    }
  }
}
