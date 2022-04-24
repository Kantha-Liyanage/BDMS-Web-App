import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL : string = environment.apiBaseURL + "/Auth";
  public static accessToken : string;
  public static username : string;
  public static userType : string;

  constructor(private http: HttpClient) { }

  signIn(userType: string, username: string, password: string) {
    let url = this.baseURL + '/Authenticate' + userType; 
    let donorAuthObj = userType == 'Donor' ? {nic : username, password : password} : {hospitalID : username, password : password};
    return this.http.post(url, donorAuthObj);  
  }

  setLoggedOnUser(userType: string, username : string, token : string){
    localStorage.setItem("username",username);
    localStorage.setItem("isLoggedIn","X");
    localStorage.setItem("userType",userType);
    localStorage.setItem("token",token);
    AuthService.accessToken = token;
    AuthService.username = username;
    this.setSigningUp(false);
  }

  static getAccessToken() : string{
    return localStorage.getItem("token");
  }

  isLoggedIn() : boolean{
    try{
      let can = localStorage.getItem("isLoggedIn").startsWith('X');
      AuthService.accessToken = localStorage.getItem("token");
      AuthService.username = localStorage.getItem("username");
      AuthService.userType = localStorage.getItem("userType");
      return can;
    }
    catch(er){
      return false;
    }
  }

  signOut(){
    localStorage.setItem("username","");
    localStorage.setItem("isLoggedIn","");
    localStorage.setItem("userType","");
    localStorage.setItem("token","");
    this.setSigningUp(false);
  }

  setSigningUp(value:boolean){
    localStorage.setItem("signingUp",value?"X":"");
  }

  isSigningUp() : boolean{
    try {
      return localStorage.getItem("signingUp").startsWith('X');
    } catch (error) {
      return false;
    }
  }
}
