import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "./global.service";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isRoot: boolean = window.location.pathname == "/" ? true : false;
  isMobile: boolean = window.innerWidth < 770;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    console.log("hello");
    this.dataService.getIPInfo("1.1.1.1").subscribe(res => {
      console.log(res);
    });
  }
}
