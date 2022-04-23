import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Donor } from '../models/donor';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  baseURL : string = environment.apiBaseURL + "/Donor";
  public static accessToken : string;
  public static username : string;
  public static userType : string;

  constructor(private http: HttpClient) { }

  register(donor: Donor) {
    let url = this.baseURL; 
    return this.http.post(url, donor);  
  }
}
