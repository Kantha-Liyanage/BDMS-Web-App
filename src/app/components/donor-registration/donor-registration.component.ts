import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MasterDataService } from 'src/app/services/master.data.service';
import { Donor } from 'src/app/models/donor';
import { Router } from '@angular/router';
import { DonorService } from 'src/app/services/donor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Utils } from 'src/app/utils/utils';


@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.css']
})
export class DonorRegistrationComponent implements OnInit {

  title : string = "Blood Donation Management System - Donor Registration";
  cities : string[] = [];
  bloodGroups : any[] = [];

  donor : Donor;
  confirmPassword : string = "";
  minDOB : string;
  maxDOB : string;

  constructor(private authService : AuthService,
              private masterDataService : MasterDataService,
              private donorService : DonorService,
              private router : Router,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) {
    this.donor = new Donor();
    this.minDOB = Utils.toAngularStringDate(this.donor.getMinDOB());
    this.maxDOB = Utils.toAngularStringDate(this.donor.getMaxDOB());
    debugger;
  }

  ngOnInit() {
    // blood groups
    this.bloodGroups = this.masterDataService.getBloodGroups();

    // get cities
    this.spinner.show();
    this.masterDataService.getCities().subscribe(
      (res)=>{
        this.cities = res["data"];
        this.spinner.hide();
      },
      (err)=>{
        debugger;
        this.spinner.hide();
      }
    );
  }
  
  signUp(){
    this.spinner.show();
    // validation
    if(!this.donor.isValidRegistration()){
      this.spinner.hide();
      this.showModalDialog("Error","Please fill all the required fileds!");
      return;
    }

    if(!this.donor.checkDOBRange()){
      this.spinner.hide();
      this.showModalDialog("Error","Date of Birth in not in valid range!");
      return;
    }

    if(this.donor.password != this.confirmPassword){
      this.spinner.hide();
      this.showModalDialog("Error","Password and Confirm Password are not matching!");
      return;
    }

    this.donorService.register(this.donor).subscribe(
      (res)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Success","Donor registration successful!");
        this.router.navigate(['/donor-update']);
      },
      (err)=>{
        debugger;
        this.spinner.hide();
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
