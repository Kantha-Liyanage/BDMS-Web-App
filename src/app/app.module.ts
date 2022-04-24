import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { DonorRegistrationComponent } from './components/donor-registration/donor-registration.component';
import { HospitalRegistrationComponent } from './components/hospital-registration/hospital-registration.component';
import { DonorProfileComponent } from './components/donor-profile/donor-profile.component';
import { HospitalDonationCampaignComponent } from './components/hospital-donation-campaign/hospital-donation-campaign.component';
import { DonationCampaignsCalendarComponent } from './components/donation-campaigns-calendar/donation-campaigns-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDialogComponent,
    ModalDialogComponent,
    DonorRegistrationComponent,
    HospitalRegistrationComponent,
    DonorProfileComponent,
    HospitalDonationCampaignComponent,
    DonationCampaignsCalendarComponent
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
    ModalDialogComponent
  ]
})
export class AppModule { }
