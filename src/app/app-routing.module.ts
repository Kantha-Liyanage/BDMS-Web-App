import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationCampaignsCalendarComponent } from './components/donation-campaigns-calendar/donation-campaigns-calendar.component';
import { DonorProfileComponent } from './components/donor-profile/donor-profile.component';
import { DonorRegistrationComponent } from './components/donor-registration/donor-registration.component';
import { HospitalDonationCampaignComponent } from './components/hospital-donation-campaign/hospital-donation-campaign.component';
import { HospitalRegistrationComponent } from './components/hospital-registration/hospital-registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'donor-signup', component: DonorRegistrationComponent },
  { path: 'hospital-signup', component: HospitalRegistrationComponent },
  { path: 'donor-update', component: DonorProfileComponent },
  { path: 'hospital-campaigns', component: HospitalDonationCampaignComponent },
  { path: 'campaigns', component: DonationCampaignsCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
