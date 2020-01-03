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
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  @Input() torrent: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  refreshTorrent() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["torrent"] && typeof this.torrent !== "undefined") {
      this.refreshTorrent();
      console.log(this.torrent);
    }
  }
}
