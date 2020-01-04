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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  onClick(el) {
    //this.focusID = el.id;
    this.focus.emit(el.id);
  }

  onClickCheck(el: any) {
    this.check.emit(el);
  }

  onCheckAll() {
    console.log("list checkedAll: ", this.checkedAll);
    this.checkAll.emit();
  }

  ngOnInit() {}
}
