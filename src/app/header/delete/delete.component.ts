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
  @Output() closeDelete = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private dataService: DataService
  ) {}

  @HostListener("document:keydown", ["$event"])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.closeDelete.emit(true);
    }
  }

  onClickBackground() {
    this.closeDelete.emit(true);
  }

  onClickClose() {
    this.closeDelete.emit(true);
  }

  cancel() {
    this.closeDelete.emit(true);
  }

  ngOnInit() {}
}
