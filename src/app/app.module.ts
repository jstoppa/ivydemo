import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlainComponent } from './plain.component';
import { Plain2Component } from './plain2.component';

@NgModule({
  declarations: [
    AppComponent,
    PlainComponent, // <-- plain
    Plain2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlainComponent, Plain2Component]
})
export class AppModule { }
