import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin, of, concat, pipe } from "rxjs";
import {
  map,
  catchError,
  take,
  takeLast,
  retry,
  retryWhen,
  delay,
  tap,
  mergeMap,
  concatMap,
  repeat
} from "rxjs/operators";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  rpc(data: string): Observable<any> {
    let url = this.globalService.API_ENDPOINT;
    return this.http.post(url, data).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  getTorrents(): Observable<any> {
    let data = {
      method: "torrent-get",
      arguments: {
        fields: [
          "activityDate",
          "addedDate",
          "bandwidthPriority",
          "comment",
          "corruptEver",
          "creator",
          "dateCreated",
          "desiredAvailable",
          "doneDate",
          "downloadDir",
          "downloadedEver",
          "downloadLimit",
          "downloadLimited",
          "editDate",
          "error",
          "errorString",
          "eta",
          "etaIdle",
          "files",
          "fileStats",
          "hashString",
          "haveUnchecked",
          "haveValid",
          "honorsSessionLimits",
          "id",
          "isFinished",
          "isPrivate",
          "isStalled",
          "labels",
          "leftUntilDone",
          "magnetLink",
          "manualAnnounceTime",
          "maxConnectedPeers",
          "metadataPercentComplete",
          "name",
          "peer-limit",
          "peers",
          "peersConnected",
          "peersFrom",
          "peersGettingFromUs",
          "peersSendingToUs",
          "percentDone",
          "pieces",
          "pieceCount",
          "pieceSize",
          "priorities",
          "queuePosition",
          "rateDownload (B/s)",
          "rateUpload (B/s)",
          "recheckProgress",
          "secondsDownloading",
          "secondsSeeding",
          "seedIdleLimit",
          "seedIdleMode",
          "seedRatioLimit",
          "seedRatioMode",
          "sizeWhenDone",
          "startDate",
          "status",
          "trackers",
          "trackerStats",
          "totalSize",
          "torrentFile",
          "uploadedEver",
          "uploadLimit",
          "uploadLimited",
          "uploadRatio",
          "wanted",
          "webseeds",
          "webseedsSendingToUs"
        ]
      }
    };
    let rpcData = JSON.stringify(data);
    let url = this.globalService.API_ENDPOINT;
    return of({}).pipe(
      mergeMap(() => {
        return this.http.post(url, rpcData).pipe(
          map((res: Response) => {
            return res;
          }),
          catchError(err => {
            return of(null);
          })
        );
      }),
      delay(3000),
      repeat()
    );
  }
}
