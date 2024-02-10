import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {LoggingService} from "./logging.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    // DropdownDirective, //!!!no dublicate - we have it in shared.module
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,//!
    HttpClientModule,
    SharedModule,
    CoreModule, //!
  ],
  bootstrap: [AppComponent],
  //providers:[LoggingService]
})
export class AppModule {
}
