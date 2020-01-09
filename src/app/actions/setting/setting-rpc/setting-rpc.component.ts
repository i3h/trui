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
import { GlobalService } from "../../../global.service";
import { DataService } from "../../../data.service";

@Component({
  selector: "app-setting-rpc",
  templateUrl: "./setting-rpc.component.html",
  styleUrls: ["./setting-rpc.component.css"]
})
export class SettingRPCComponent implements OnInit {
  @Output() closeSetting = new EventEmitter<boolean>();
  rpcAddr: string;
  rpcAddrErr: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  cancel() {
    this.closeSetting.emit(true);
  }

  save() {
    window.localStorage.setItem("rpcAddr", this.rpcAddr);
    this.closeSetting.emit(true);
    location.reload();
  }

  ngOnInit() {
    this.rpcAddr = window.localStorage.getItem("rpcAddr");
  }
}
