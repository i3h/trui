import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root"
})
export class TorrentService {
  constructor(private globalService: GlobalService) {}

  getGlobalStats(torrents: any) {
    let stats = { fileNum: 0, rateColor: "", rateText: "" };
    stats.fileNum = torrents.length;
    stats.rateColor = this.setGlobalRateColor(torrents);
    stats.rateText = this.setGlobalRateText(torrents);
    return stats;
  }

  setGlobalRateColor(torrents: any) {
    let d = 0;
    let u = 0;
    let rateColor = "";
    for (let i = 0; i < torrents.length; i++) {
      d += torrents[i].rateDownload;
      u += torrents[i].rateUpload;
    }
    if (d != 0 || u != 0) {
      rateColor = "green";
    } else {
      rateColor = "";
    }
    return rateColor;
  }

  setGlobalRateText(torrents: any) {
    let d = 0;
    let u = 0;
    for (let i = 0; i < torrents.length; i++) {
      d += torrents[i].rateDownload;
      u += torrents[i].rateUpload;
    }
    let rateText = " | D " + this.addUnit(d) + "/s";
    rateText += " | U " + this.addUnit(u) + "/s";
    return rateText;
  }

  addMoreAttr(torrent: any) {
    let t = torrent;
    t = this.setCheckedStatus(t);
    t = this.setStatusCode(t);
    t = this.setSizeText(t);
    t = this.setUploadedEver(t);
    t = this.setUploadRatio(t);
    t = this.setProgressValue(t);
    t = this.setProgressText(t);
    t = this.setProgressColor(t);
    t = this.setStatusColor(t);
    t = this.setRateText(t);
    return t;
  }

  setStatusCode(torrent: any) {
    let t = torrent;
    if (t.status == 0) {
      t.sbStatus = "Stopped";
    } else if (t.status == 1) {
      t.sbStatus = "Queued to check";
    } else if (t.status == 2) {
      t.sbStatus = "Checking";
    } else if (t.status == 3) {
      t.sbStatus = "Queued to download";
    } else if (t.status == 4) {
      t.sbStatus = "Downloading";
    } else if (t.status == 5) {
      t.sbStatus = "Queued to seed";
    } else if (t.status == 6) {
      t.sbStatus = "Seeding";
    }

    if (t.errorString != "") {
      t.sbStatus = "Error";
    }
    return t;
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

  setSizeText(torrent: any) {
    let t = torrent;
    t.sbSizeText = this.addUnit(t.totalSize);
    return t;
  }

  setUploadedEver(torrent: any) {
    let t = torrent;
    t.sbUploadedEver = this.addUnit(t.uploadedEver);
    return t;
  }

  setUploadRatio(torrent: any) {
    let t = torrent;
    t.sbUploadRatio = t.uploadRatio.toFixed(2).toString();
    return t;
  }

  setCheckedStatus(torrent: any) {
    let t = torrent;
    if (this.globalService.checkedList.includes(t.id)) {
      t.sbChecked = true;
    } else {
      t.sbChecked = false;
    }
    return t;
  }

  setProgressValue(torrent: any) {
    let t = torrent;
    let value = Math.ceil((t.downloadedEver / t.totalSize) * 100);
    if (value < 100) {
      t.sbProgressValue = value;
    } else {
      t.sbProgressValue = 100;
    }
    return t;
  }

  setProgressText(torrent: any) {
    let t = torrent;
    t.sbProgressText = t.sbProgressValue + "%";
    return t;
  }

  setProgressColor(torrent: any) {
    let t = torrent;
    if (t.sbStatus == "Downloading") {
      t.sbProgressColor = "is-success";
    } else if (t.sbStatus == "Seeding") {
      t.sbProgressColor = "is-info";
    } else {
      t.sbProgressColor = "";
    }
    return t;
  }

  setStatusColor(torrent: any) {
    let t = torrent;
    if (t.sbStatus == "Downloading") {
      t.sbStatusColor = "green";
    } else if (t.sbStatus == "Seeding") {
      t.sbStatusColor = "#23A1D8";
    } else if (t.sbStatus == "Error") {
      t.sbStatusColor = "red";
    } else {
      t.sbStatusColor = "";
    }
    return t;
  }

  setRateText(torrent: any) {
    let t = torrent;
    if (t.rateDownload != 0 || t.rateUpload != 0) {
      t.sbRateColor = "green";
    }
    t.sbRateText = "D " + this.addUnit(t.rateDownload) + "/s";
    t.sbRateText += " | U " + this.addUnit(t.rateUpload) + "/s";
    return t;
  }
}
