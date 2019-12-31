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
      jsonrpc: "2.0",
      method: "torrent-get",
      arguments: {
        fields: ["addedDate"]
      },
      id: 1
    };
    let rpcData = JSON.stringify(data);
    this.dataService.testRpc(rpcData).subscribe(res => {
      console.log(res);
    });
  }
}
