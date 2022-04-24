import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { Campaign } from 'src/app/models/campaign';
import { AuthService } from 'src/app/services/auth.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { MasterDataService } from 'src/app/services/master.data.service';

@Component({
  selector: 'app-hospital-donation-campaign',
  templateUrl: './hospital-donation-campaign.component.html',
  styleUrls: ['./hospital-donation-campaign.component.css']
})
export class HospitalDonationCampaignComponent implements OnInit {

  title : string = "Blood Donation Management System - Campaigns Calendar";
  cities : string[] = [];
  bloodGroups : any[] = [];

  campaign : Campaign;
  campaigns : Campaign[];

  constructor(private masterDataService : MasterDataService,
              private campaignService : CampaignService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { 
    this.campaign = new Campaign();
    this.campaigns = [];
    this.campaign.hospitalID = AuthService.getUserID();
  }

  ngOnInit() {
    this.spinner.show();

    // blood groups
    this.bloodGroups = this.masterDataService.getBloodGroups();

    // get cities
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

    // get hospital all
    this.getHospitalAll();
  }

  getHospitalAll() {
    this.spinner.show();
    this.campaigns.slice(0);
    this.campaignService.getHospitalAll(this.campaign.hospitalID).subscribe(
      (res)=>{
        debugger;
        this.campaigns = Object.values(res);
        this.spinner.hide();
      },
      (err)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Error","Hospital campaigns not found!<br/>Error: " + err.error['message']);
      }
    );  
  }

  selectAllbloodGroups(){
    this.bloodGroups.forEach(bg => {
      bg.selected = !bg.selected;
    });
  }

  saveCampaign(){
    this.spinner.show();

    // validation
    if(!this.campaign.isValidCampaign()){
      this.spinner.hide();
      this.showModalDialog("Error","Please fill all the required fileds!");
      return;
    }

    // blood groups
    this.campaign.bloodGroups = "";
    this.bloodGroups.forEach(bg => {
      if(bg.selected){
        if(this.campaign.bloodGroups == ""){
          this.campaign.bloodGroups = bg.id;
        }
        else{
          this.campaign.bloodGroups += ',' + bg.id;
        }
      }
    });

    this.campaignService.create(this.campaign).subscribe(
      (res)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Success","Campaign saved successful!");
        this.clearAll()
      },
      (err)=>{
        debugger;
        this.spinner.hide();
        this.showModalDialog("Error","Campaign saving unsuccessful!<br/>Error: " + err.error['message']);
      }
    );
  }

  clearAll(){
    this.campaign = new Campaign();
    this.campaign.hospitalID = AuthService.getUserID();
  }

  cancel(){}

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }

}
