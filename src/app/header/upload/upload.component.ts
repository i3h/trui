import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  @Output() closeUpload = new EventEmitter<boolean>();

  constructor() {}

  onClickBackground() {
    this.closeUpload.emit(true);
  }

  onClickClose() {
    this.closeUpload.emit(true);
  }

  ngOnInit() {}
}
