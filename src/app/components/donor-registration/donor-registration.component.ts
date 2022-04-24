import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MasterDataService } from 'src/app/services/master.data.service';
import { Donor } from 'src/app/models/donor';
import { Router } from '@angular/router';
import { DonorService } from 'src/app/services/donor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
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
  confirmPassword : string = "";
  minDOB : string;
  maxDOB : string;

  constructor(private authService : AuthService,
              private masterDataService : MasterDataService,
              private donorService : DonorService,
              private router : Router,
              private modalService: NgbModal) {
    this.donor = new Donor();
    this.minDOB = Utils.toAngularStringDate(this.donor.getMinDOB());
    this.maxDOB = Utils.toAngularStringDate(this.donor.getMaxDOB());
    debugger;
  }

  ngOnInit() {
    this.masterDataService.getCities().subscribe(
      (res)=>{
        this.cities = res["data"];
      },
      (err)=>{
        debugger;
      }
    );
  }
  
  signUp(){
    // validation
    if(!this.donor.isValidRegistration()){
      this.showModalDialog("Error","Please fill all the required fileds!");
      return;
    }

    if(!this.donor.checkDOBRange()){
      this.showModalDialog("Error","Date of Birth in not in valid range!");
      return;
    }

    if(this.donor.password != this.confirmPassword){
      this.showModalDialog("Error","Password and Confirm Password are not matching!");
      return;
    }

    this.donorService.register(this.donor).subscribe(
      (res)=>{
        debugger;
        this.showModalDialog("Success","Donor registration successful!");
      },
      (err)=>{
        debugger;
        this.showModalDialog("Error","Donor registration unsuccessful!<br/>Error: " + err.error['message']);
      }
    );
  }

  cancel(){
    this.router.navigate(['']);
  }

  isSigningUp(){
    return this.authService.isSigningUp();
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }

}
