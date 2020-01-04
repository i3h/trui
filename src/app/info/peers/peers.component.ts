import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "../../global.service";
import { DataService } from "../../data.service";

@Component({
  selector: "app-peers",
  templateUrl: "./peers.component.html",
  styleUrls: ["./peers.component.css"]
})
export class PeersComponent implements OnInit {
  @Input() torrent: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  ngOnInit() {}
}
