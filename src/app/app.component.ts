import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title : string = "Blood Donation Management System";
  username : string = "";
  password : string = "";

  isLoggedIn : boolean = false;

  constructor(private router : Router,
              private authService : AuthService,
              private modalService: NgbModal){
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

  signInDonor(){
    this.authService.signIn('Donor', this.username, this.password).subscribe(
      (res)=>{
        this.authService.setLoggedOnUser('Donor', res["firstName"] + ' (' + res["nic"] + ')', res["token"]);
        this.isLoggedIn = true;
      },
      (err)=>{
        this.showModalDialog("Error", "Invalid login.");
      }
    );
  }

  signInHospital(){
    this.authService.signIn('Hospital', this.username, this.password).subscribe(
      (res)=>{
        this.authService.setLoggedOnUser('Hospital', res["name"] + ' (' + res["hospitalID"] + ')', res["token"]);
        this.isLoggedIn = true;
      },
      (err)=>{
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

  isSigningUp(){
    return this.authService.isSigningUp();
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }
}
