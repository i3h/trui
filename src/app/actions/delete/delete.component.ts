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
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"]
})
export class DeleteComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  deleteNotice: string;
  delete_local_data: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  @HostListener("document:keydown", ["$event"])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.close.emit(true);
    }
  }

  onClickBackground() {
    this.close.emit(true);
  }

  onClickClose() {
    this.close.emit(true);
  }

  cancel() {
    this.close.emit(true);
  }

  delete() {
    if (this.globalService.checkedList.length > 0) {
      let data = {
        ids: this.globalService.checkedList,
        delete_local_data: this.delete_local_data
      };
      this.dataService.deleteTorrents(data).subscribe(res => {
        //console.log(res);
      });
      // clear checked list
      this.globalService.checkedList = [];

      this.close.emit(true);
    }
    location.reload();
  }

  ngOnInit() {
    if (this.globalService.checkedList.length > 0) {
      this.deleteNotice =
        "You will delete " +
        this.globalService.checkedList.length.toString() +
        " files.";
    } else {
      this.deleteNotice = "No files chosen.";
    }
  }
}
