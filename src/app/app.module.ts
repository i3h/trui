import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { AppConfigService } from "./app-config.service";
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
import { UploadComponent } from "./header/upload/upload.component";
import { DeleteComponent } from "./header/delete/delete.component";
import { SettingComponent } from "./header/setting/setting.component";
import { SettingTorrentsComponent } from "./header/setting/setting-torrents/setting-torrents.component";
import { SettingSpeedComponent } from "./header/setting/setting-speed/setting-speed.component";
import { SettingPeersComponent } from "./header/setting/setting-peers/setting-peers.component";
import { SettingNetworkComponent } from "./header/setting/setting-network/setting-network.component";
import { InfoComponent } from "./info/info.component";
import { DetailsComponent } from "./info/details/details.component";
import { PeersComponent } from "./info/peers/peers.component";
import { TrackersComponent } from "./info/trackers/trackers.component";
import { FilesComponent } from "./info/files/files.component";

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    UploadComponent,
    DeleteComponent,
    SettingComponent,
    SettingTorrentsComponent,
    SettingSpeedComponent,
    SettingPeersComponent,
    SettingNetworkComponent,
    InfoComponent,
    DetailsComponent,
    PeersComponent,
    TrackersComponent,
    FilesComponent
  ],
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
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
