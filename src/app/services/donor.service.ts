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

  getDonor(nic : string){
    let url = this.baseURL + '?nic=' + nic; 
    return this.http.get(url);
  }

  register(donor: Donor) {
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

    return this.http.patch(url, json); 
  }
}
