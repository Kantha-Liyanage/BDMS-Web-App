import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { Donor } from 'src/app/models/donor';
import { DonorService } from 'src/app/services/donor.service';
import { MasterDataService } from 'src/app/services/master.data.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-donor-profile',
  templateUrl: './donor-profile.component.html',
  styleUrls: ['./donor-profile.component.css']
})
export class DonorProfileComponent implements OnInit {

  title : string = "Blood Donation Management System - Donor Profile";
  cities : string[] = [];

  donor : Donor;
  minDOB : string;
  maxDOB : string;

  constructor(private masterDataService : MasterDataService,
              private donorService : DonorService,
              private router : Router,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { 
    this.donor = new Donor();
    this.minDOB = Utils.toAngularStringDate(this.donor.getMinDOB());
    this.maxDOB = Utils.toAngularStringDate(this.donor.getMaxDOB());
  }

  ngOnInit() {
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

    // get profile
    this.spinner.show(); 
    this.donorService.getDonor().subscribe(
      (res)=>{
        debugger;
        this.spinner.hide();
      },
      (err)=>{
        debugger;
        this.spinner.hide();
      }
    );

  }

  updateProfile(){
    this.spinner.show();
    // validation
    if(!this.donor.isValidProfileUpdate()){
      this.spinner.hide();
      this.showModalDialog("Error","Please fill all the required fileds!");
      return;
    }

    if(!this.donor.checkDOBRange()){
      this.spinner.hide();
      this.showModalDialog("Error","Date of Birth in not in valid range!");
      return;
    }

    this.donorService.updateProfile(this.donor).subscribe(
      (res)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Success","Donor profile updated successful!");
      },
      (err)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Error","Donor profile update unsuccessful!<br/>Error: " + err.error['message']);
      }
    );
  }

  cancel(){
    this.router.navigate(['']);
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }

}
