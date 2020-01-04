import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root"
})
export class TorrentService {
  torrent: any;

  constructor(private globalService: GlobalService) {}

  addMoreAttr(torrent: any) {
    this.torrent = torrent;

    this.setCheckedStatus();
    this.setStatusCode();
    this.setSizeText();
    this.setUploadedEver();
    this.calUploadRatio();
    this.setProgressValue();
    this.setProgressText();
    this.setProgressColor();
    this.setStatusColor();
    this.setRateText();

    return this.torrent;
  }

  setStatusCode() {
    if (this.torrent.status == 0) {
      this.torrent.status = "Stopped";
    } else if (this.torrent.status == 1) {
      this.torrent.status = "Queued to check";
    } else if (this.torrent.status == 2) {
      this.torrent.status = "Checking";
    } else if (this.torrent.status == 3) {
      this.torrent.status = "Queued to download";
    } else if (this.torrent.status == 4) {
      this.torrent.status = "Downloading";
    } else if (this.torrent.status == 5) {
      this.torrent.status = "Queued to seed";
    } else if (this.torrent.status == 6) {
      this.torrent.status = "Seeding";
    }
  }

  addUnit(num) {
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(2).toString() + " GB";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2).toString() + " MB";
    } else if (num > 1000) {
      return (num / 1000).toFixed(2).toString() + " KB";
    } else {
      return num.toString() + " B";
    }
  }

  setSizeText() {
    this.torrent.sizeText = this.addUnit(this.torrent.totalSize);
  }

  setUploadedEver() {
    this.torrent.uploadedEver = this.addUnit(this.torrent.uploadedEver);
  }

  calUploadRatio() {
    this.torrent.uploadRatio = this.torrent.uploadRatio.toFixed(2).toString();
  }

  setCheckedStatus() {
    if (this.globalService.checkedList.includes(this.torrent.id)) {
      this.torrent.checked = true;
    } else {
      this.torrent.checked = false;
    }
  }

  setProgressValue() {
    let value = Math.ceil(
      (this.torrent.downloadedEver / this.torrent.totalSize) * 100
    );
    if (value < 100) {
      this.torrent.progressValue = value;
    } else {
      this.torrent.progressValue = 100;
    }
  }

  setProgressText() {
    this.torrent.progressText = this.torrent.progressValue + "%";
  }

  setProgressColor() {
    if (this.torrent.status == "Downloading") {
      this.torrent.progressColor = "is-success";
    } else if (this.torrent.status == "Seeding") {
      this.torrent.progressColor = "is-info";
    } else {
      this.torrent.progressColor = "";
    }
  }

  setStatusColor() {
    if (this.torrent.status == "Downloading") {
      this.torrent.statusColor = "green";
    } else if (this.torrent.status == "Seeding") {
      this.torrent.statusColor = "#23A1D8";
    } else {
      this.torrent.statusColor = "";
    }
  }

  setRateText() {
    if (this.torrent.rateDownload != 0 || this.torrent.rateUpload != 0) {
      this.torrent.rateColor = "green";
    }
    this.torrent.rateText =
      "D " + this.addUnit(this.torrent.rateDownload) + "/s";
    this.torrent.rateText +=
      " | U " + this.addUnit(this.torrent.rateUpload) + "/s";
  }
}
