import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //dom manipolazione, eventi click e submit
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common'; //per usare ngif
import { kvaasService } from './kvaas.service';
import { TeatroComponent } from './teatro/teatro.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, CommonModule],
  declarations: [AppComponent, TeatroComponent],
  bootstrap: [AppComponent, TeatroComponent],
  providers: [kvaasService],
})
export class AppModule {}
