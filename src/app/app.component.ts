import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "./global.service";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @Output() change = new EventEmitter<any>();
  torrents: any;
  isRoot: boolean = window.location.pathname == "/" ? true : false;
  isMobile: boolean = window.innerWidth < 770;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getTorrents().subscribe(res => {
      if (res.result == "success") {
        this.torrents = res.arguments.torrents;
        this.change.emit(this.torrents);
      }
    });
  }
}
