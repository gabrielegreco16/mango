import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgcRangeComponent } from './ngc-range/ngc-range.component';
import { Exercise1Component } from './exercise1/exercise1.component';
import { Exercise2Component } from './exercise2/exercise2.component';
import { NumericDirective } from './directives/numeric-directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NgcRangeComponent,
    Exercise1Component,
    Exercise2Component,
    NumericDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
