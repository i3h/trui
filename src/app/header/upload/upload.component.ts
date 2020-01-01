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
  @Input() showUpload: boolean;
  @Output() shown = new EventEmitter<boolean>();

  constructor() {}

  onClickBackground() {
    this.showUpload = false;
  }

  onClickClose() {
    this.showUpload = false;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes["showUpload"]);
    if (changes["showUpload"] && typeof this.showUpload !== "undefined") {
      this.showUpload = true;
      this.shown.emit(true);
    }
  }
}
