import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Donor } from '../models/donor';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  baseURL : string = environment.apiBaseURL + "/Donor";
 
  constructor(private http: HttpClient) { }

  getDonor(){
    debugger;
    let url = this.baseURL; 
    return this.http.get(url);
  }

  register(donor: Donor) {
    debugger;
    let url = this.baseURL; 
    let json = {
      nic : donor.nic,
      password: donor.password,
      firstName : donor.firstName,
      lastName : donor.lastName,
      dob : Utils.toDotNetDate(donor.dob),
      gender : donor.gender,
      bloodGroup : donor.bloodGroup,
      city : donor.city,
      email : donor.email,
      phone : donor.phone,
    }

    return this.http.post(url, json);  
  }

  updateProfile(donor: Donor){
    debugger;
    let url = this.baseURL; 
    let json = {
      nic : donor.nic,
      firstName : donor.firstName,
      lastName : donor.lastName,
      dob : Utils.toDotNetDate(donor.dob),
      gender : donor.gender,
      bloodGroup : donor.bloodGroup,
      city : donor.city,
      email : donor.email,
      phone : donor.phone,
    }

    return this.http.put(url, json); 
  }
}
