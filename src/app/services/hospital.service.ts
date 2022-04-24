import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseURL : string = environment.apiBaseURL + "/Hospital";
 
  constructor(private http: HttpClient) { }

  register(hospital: Hospital) {
    debugger;
    let url = this.baseURL; 
    
    let json = {
      hospitalID : hospital.hospitalID,
      name: hospital.name,
      address : hospital.address,
      contactNo1 : hospital.contactNo1,
      contactNo2 : hospital.contactNo2,
      city : hospital.city,
      password : hospital.password
    }

    return this.http.post(url, hospital);  
  }
}
