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
    let data = {
      method: "",
      arguments: {}
    };
    let rpcData = JSON.stringify(data);
    this.dataService.testRpc(rpcData).subscribe(res => {
    //this.dataService.updateCSRFToken(rpcData).subscribe(res => {
      console.log(res);
    });
  }
}
