import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  baseURL : string = environment.apiBaseURL + "/DonationCampaign";
 
  constructor(private http: HttpClient) { }

  create(campaign: Campaign) {
    debugger;
    let url = this.baseURL; 
    
    let json = {
      campaignID : campaign.campaignID,
      hospitalID : campaign.hospitalID,
      campaignName : campaign.campaignName,
      bloodGroups : campaign.bloodGroups,
      city : campaign.city,
      location : campaign.location,
      campaignDate : Utils.toDotNetDate(campaign.campaignDate),
      timeSlots : campaign.timeSlots,
      remarks  : campaign.remarks,
      status : campaign.status
    }

    return this.http.post(url, json);  
  }

  update(campaign: Campaign) {
    debugger;
    let url = this.baseURL; 
    
    let json = {
      campaignID : campaign.campaignID,
      hospitalID : campaign.hospitalID,
      campaignName : campaign.campaignName,
      bloodGroups : campaign.bloodGroups,
      city : campaign.city,
      location : campaign.location,
      campaignDate : Utils.toDotNetDate(campaign.campaignDate),
      timeSlots : campaign.timeSlots,
      remarks  : campaign.remarks,
      status : campaign.status
    }

    return this.http.patch(url, json);  
  }

  getHospitalAll(hospitalID : string){
    debugger;
    let url = this.baseURL + '/HospitalOpenAll?hospitalID=' + hospitalID; 
    return this.http.get(url); 
  }
}
