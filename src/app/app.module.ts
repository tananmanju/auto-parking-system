import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AddcarComponent} from './_modal/addcar/addcar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './_modal/confirm-dialog/confirm-dialog.component';
import {QueryDataComponent} from './_modal/query-data/query-data.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddcarComponent,
    ConfirmDialogComponent,
    QueryDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddcarComponent, ConfirmDialogComponent ,QueryDataComponent]
})
export class AppModule { }
