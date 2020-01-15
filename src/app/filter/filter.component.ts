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
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  isOpen: boolean = false;
  @Input() filterGroup: string;

  onOpen() {
    this.isOpen = !this.isOpen;
  }

  onClick(g) {
    //this.filterGroup = g;
  }

  constructor() {}

  ngOnInit() {}
}
