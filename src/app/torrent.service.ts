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
      this.torrent.sbStatus = "Stopped";
    } else if (this.torrent.status == 1) {
      this.torrent.sbStatus = "Queued to check";
    } else if (this.torrent.status == 2) {
      this.torrent.sbStatus = "Checking";
    } else if (this.torrent.status == 3) {
      this.torrent.sbStatus = "Queued to download";
    } else if (this.torrent.status == 4) {
      this.torrent.sbStatus = "Downloading";
    } else if (this.torrent.status == 5) {
      this.torrent.sbStatus = "Queued to seed";
    } else if (this.torrent.status == 6) {
      this.torrent.sbStatus = "Seeding";
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
    this.torrent.sbSizeText = this.addUnit(this.torrent.totalSize);
  }

  setUploadedEver() {
    this.torrent.sbUploadedEver = this.addUnit(this.torrent.uploadedEver);
  }

  calUploadRatio() {
    this.torrent.sbUploadRatio = this.torrent.uploadRatio.toFixed(2).toString();
  }

  setCheckedStatus() {
    if (this.globalService.checkedList.includes(this.torrent.id)) {
      this.torrent.sbChecked = true;
    } else {
      this.torrent.sbChecked = false;
    }
  }

  setProgressValue() {
    let value = Math.ceil(
      (this.torrent.downloadedEver / this.torrent.totalSize) * 100
    );
    if (value < 100) {
      this.torrent.sbProgressValue = value;
    } else {
      this.torrent.sbProgressValue = 100;
    }
  }

  setProgressText() {
    this.torrent.sbProgressText = this.torrent.sbProgressValue + "%";
  }

  setProgressColor() {
    if (this.torrent.sbStatus == "Downloading") {
      this.torrent.sbProgressColor = "is-success";
    } else if (this.torrent.sbStatus == "Seeding") {
      this.torrent.sbProgressColor = "is-info";
    } else {
      this.torrent.sbProgressColor = "";
    }
  }

  setStatusColor() {
    if (this.torrent.sbStatus == "Downloading") {
      this.torrent.sbStatusColor = "green";
    } else if (this.torrent.sbStatus == "Seeding") {
      this.torrent.sbStatusColor = "#23A1D8";
    } else {
      this.torrent.sbStatusColor = "";
    }
  }

  setRateText() {
    if (this.torrent.sbRateDownload != 0 || this.torrent.sbRateUpload != 0) {
      this.torrent.sbRateColor = "green";
    }
    this.torrent.sbRateText =
      "D " + this.addUnit(this.torrent.rateDownload) + "/s";
    this.torrent.sbRateText +=
      " | U " + this.addUnit(this.torrent.rateUpload) + "/s";
  }
}
