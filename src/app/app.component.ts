import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title : string = "~ Blood Donation Management System ~";
  username : string = "";
  password : string = "";

  isLoggedIn : boolean = false;

  constructor(private router : Router,
              private authService : AuthService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService){
    debugger;          
  }

  ngOnInit() {
    debugger;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.setSigningUp(false);
  }

  getLoggedOnUsername(){
    return AuthService.username;
  }

  getLoggedOnUserType(){
    return AuthService.getUserType();
  }

  signInDonor(){
    this.spinner.show();
    this.authService.signIn('Donor', this.username, this.password).subscribe(
      (res)=>{
        this.authService.setLoggedOnUser('Donor', res["nic"], res["firstName"], res["token"]);
        this.isLoggedIn = true;
        this.spinner.hide();
        this.router.navigate(['/donor-update']);
      },
      (err)=>{
        this.spinner.hide();
        this.showModalDialog("Error", "Invalid login.");
      }
    );
  }

  signInHospital(){
    this.spinner.show();
    this.authService.signIn('Hospital', this.username, this.password).subscribe(
      (res)=>{
        this.authService.setLoggedOnUser('Hospital', res["hospitalID"], res["name"], res["token"]);
        this.isLoggedIn = true;
        this.spinner.hide();
        this.router.navigate(['/campaigns']);
      },
      (err)=>{
        this.spinner.hide();
        this.showModalDialog("Error", "Invalid login.");
      }
    );
  }

  signOut(){
    this.authService.signOut();
    this.isLoggedIn = false;
    this.password = "";
  }

  signUpDonor(){
    this.authService.setSigningUp(true);
    this.router.navigate(['/donor-signup']); 
  }

  signUpHospital(){
    this.authService.setSigningUp(true);
    this.router.navigate(['/hospital-signup']); 
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
