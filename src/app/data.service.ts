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
import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root"
})
export class DataService {
  API_ENDPOINT = this.appConfigService.getConfig().api;

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private appConfigService: AppConfigService
  ) {}

  rpc(): Observable<any> {
    let url = this.API_ENDPOINT;
    return this.http.post(url, "").pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        //console.log("err: ", err);
        return of(err);
      })
    );
  }

  getSession(): Observable<any> {
    let data = {
      method: "session-get"
    };
    let rpcData = JSON.stringify(data);
    let url = this.API_ENDPOINT;
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
          "rateDownload",
          "rateUpload",
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
    let url = this.API_ENDPOINT;
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

  uploadTorrents(data: any): Observable<any> {
    let rpcData = {
      method: "torrent-add",
      arguments: {
        metainfo: data.metainfo,
        "download-dir": data.download_dir,
        paused: data.paused
      }
    };
    let url = this.API_ENDPOINT;
    return this.http.post(url, rpcData).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  deleteTorrents(data: any): Observable<any> {
    let rpcData = {
      method: "torrent-remove",
      arguments: {
        ids: data.ids,
        "delete-local-data": data.delete_local_data
      }
    };
    let url = this.API_ENDPOINT;
    return this.http.post(url, rpcData).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  startTorrents(data: any): Observable<any> {
    let rpcData = {
      method: "torrent-start",
      arguments: {
        ids: data.ids
      }
    };
    let url = this.API_ENDPOINT;
    return this.http.post(url, rpcData).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  stopTorrents(data: any): Observable<any> {
    let rpcData = {
      method: "torrent-stop",
      arguments: {
        ids: data.ids
      }
    };
    let url = this.API_ENDPOINT;
    return this.http.post(url, rpcData).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }
}
