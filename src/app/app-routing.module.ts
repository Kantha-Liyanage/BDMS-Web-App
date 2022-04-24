import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovePurchReqComponent } from './components/approve-purch-req/approve-purch-req.component';
import { DonorProfileComponent } from './components/donor-profile/donor-profile.component';
import { DonorRegistrationComponent } from './components/donor-registration/donor-registration.component';
import { HospitalRegistrationComponent } from './components/hospital-registration/hospital-registration.component';
import { NewPurchReqComponent } from './components/new-purch-req/new-purch-req.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'donor-signup', component: DonorRegistrationComponent },
  { path: 'hospital-signup', component: HospitalRegistrationComponent },
  { path: 'donor-update', component: DonorProfileComponent },
  { path: 'new-pr', component: NewPurchReqComponent },
  { path: 'approve-prs', component: ApprovePurchReqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
