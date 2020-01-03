import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { ListComponent } from "./list/list.component";

import { CsrfInterceptorService } from "./csrf-interceptor.service";
import { UploadComponent } from './header/upload/upload.component';
import { DeleteComponent } from './header/delete/delete.component';
import { SettingComponent } from './header/setting/setting.component';
import { TorrentsComponent } from './header/setting/torrents/torrents.component';
import { SpeedComponent } from './header/setting/speed/speed.component';
import { PeersComponent } from './header/setting/peers/peers.component';
import { NetworkComponent } from './header/setting/network/network.component';
import { InfoComponent } from './info/info.component';
import { ChartsComponent } from './info/charts/charts.component';
import { DetailsComponent } from './info/details/details.component';
import { TrackersComponent } from './info/trackers/trackers.component';
import { FilesComponent } from './info/files/files.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListComponent, UploadComponent, DeleteComponent, SettingComponent, TorrentsComponent, SpeedComponent, PeersComponent, NetworkComponent, InfoComponent, ChartsComponent, DetailsComponent, TrackersComponent, FilesComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatRippleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
