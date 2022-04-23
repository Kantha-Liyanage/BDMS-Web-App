import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MasterDataService } from 'src/app/services/master.data.service';
import { Donor } from 'src/app/models/donor';
import { Router } from '@angular/router';
import { DonorService } from 'src/app/services/donor.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.css']
})
export class DonorRegistrationComponent implements OnInit {

  title : string = "Blood Donation Management System - Donor Registration";
  cities : string[] = [];

  donor : Donor;
  dob : any;
  confirmPassword : string = "";

  constructor(private authService : AuthService,
              private masterDataService : MasterDataService,
              private donorService : DonorService,
              private router : Router) {
    this.donor = new Donor();
  }

  ngOnInit() {
    this.masterDataService.getCities().subscribe(
      (res)=>{
        debugger;
        this.cities = res["data"];
      },
      (err)=>{
        debugger;
      }
    );
  }

  signUp(){
    debugger;
    this.donor.dob = Utils.toDotNetDate(this.dob);
    this.donorService.register(this.donor).subscribe(
      (res)=>{
        debugger;
      },
      (err)=>{
        debugger;
      }
    );
  }

  cancel(){
    this.router.navigate(['']);
  }

  isSigningUp(){
    return this.authService.isSigningUp();
  }

}
