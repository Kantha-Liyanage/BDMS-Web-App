import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { NewPurchReqComponent } from './components/new-purch-req/new-purch-req.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { MaterialPickerComponent } from './components/material-picker/material-picker.component';
import { ApprovePurchReqComponent } from './components/approve-purch-req/approve-purch-req.component';
import { ViewPurchReqComponent } from './components/view-purch-req/view-purch-req.component';
import { DonorRegistrationComponent } from './components/donor-registration/donor-registration.component';
import { HospitalRegistrationComponent } from './components/hospital-registration/hospital-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDialogComponent,
    ModalDialogComponent,
    NewPurchReqComponent,
    MaterialPickerComponent,
    ApprovePurchReqComponent,
    ViewPurchReqComponent,
    DonorRegistrationComponent,
    HospitalRegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalDialogComponent,
    MaterialPickerComponent,
    ViewPurchReqComponent
  ]
})
export class AppModule { }
