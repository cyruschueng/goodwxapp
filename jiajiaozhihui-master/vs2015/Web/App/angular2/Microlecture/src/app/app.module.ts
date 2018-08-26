import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule , Http } from '@angular/http';

import { AppComponent } from './app.component';
import { ResolverService  } from './service/resolver.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [ResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
