import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Hospital } from 'src/app/models/hospital';
import { AuthService } from 'src/app/services/auth.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MasterDataService } from 'src/app/services/master.data.service';

@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.css']
})
export class HospitalRegistrationComponent implements OnInit {

  title : string = "Blood Donation Management System - Hospital Registration";
  cities : string[] = [];

  hospital : Hospital;
  confirmPassword : string = "";

  constructor(private authService : AuthService,
              private masterDataService : MasterDataService,
              private hospitalService : HospitalService,
              private router : Router,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { 
    this.hospital = new Hospital();
  }

  ngOnInit() {
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
    if(!this.hospital.isValidRegistration()){
      this.spinner.hide();
      this.showModalDialog("Error","Please fill all the required fileds!");
      return;
    }

    if(this.hospital.password != this.confirmPassword){
      this.spinner.hide();
      this.showModalDialog("Error","Password and Confirm Password are not matching!");
      return;
    }

    this.hospitalService.register(this.hospital).subscribe(
      (res)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Success","Hospital registration successful!");
      },
      (err)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Error","Hospital registration unsuccessful!<br/>Error: " + err.error['message']);
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
