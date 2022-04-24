import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { Campaign } from 'src/app/models/campaign';
import { AuthService } from 'src/app/services/auth.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { MasterDataService } from 'src/app/services/master.data.service';
import { Utils } from 'src/app/utils/utils';

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

  getFriendlyDate(date : any){
    return Utils.toDisplayDate(date);
  }

  selectAllbloodGroups(){
    debugger;
    var chkbx = document.getElementById("allBloodGroups");

    this.bloodGroups.forEach(bg => {
      bg.selected = chkbx['checked'];
    });
  }

  displayBloodGroups(){
    this.bloodGroups.forEach(bg => {
      bg.selected = this.campaign.bloodGroups.indexOf(bg.id) > -1;
    });
  }

  updateBloodGroups(){
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
  }

  saveCampaign(){
    debugger;
    this.spinner.show();

    // validation
    if(!this.campaign.isValidCampaign()){
      this.spinner.hide();
      this.showModalDialog("Error","Please fill all the required fileds!");
      return;
    }

    // blood groups
    this.updateBloodGroups();

    if(this.campaign.isPersistent){
      this.campaignService.update(this.campaign).subscribe(
        (res)=>{
          debugger;
          this.spinner.hide();
          this.showModalDialog("Success","Campaign saved successful!");
        },
        (err)=>{
          debugger;
          this.spinner.hide();
          this.showModalDialog("Error","Campaign saving unsuccessful!<br/>Error: " + err.error['message']);
        }
      );
    }
    else{
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

    this.getHospitalAll();
    this.ngOnInit();
  }

  editCampaign(camp : Campaign){
    debugger;
    
    this.campaign.campaignID = camp.campaignID;
    this.campaign.hospitalID = camp.hospitalID;
    this.campaign.campaignName = camp.campaignName;
    this.campaign.bloodGroups = camp.bloodGroups;
    this.campaign.city = camp.city;
    this.campaign.location = camp.location;
    this.campaign.campaignDate = Utils.toAngularDate(Utils.toDisplayDate(camp.campaignDate.toString()));
    this.campaign.timeSlots = camp.timeSlots;
    this.campaign.remarks = camp.remarks;
    this.campaign.status = camp.status;
    this.campaign.isPersistent = true;

    this.displayBloodGroups();

    // focus
    var sectionOne = document.getElementById("collapseOne");
    if(sectionOne.className.indexOf("collapsed")>-1){
      sectionOne.className = sectionOne.className.replace("collapsed", "show"); 
    }
    else{
      sectionOne.className = sectionOne.className.trim() + " show";
    }

    var sectionTwo = document.getElementById("collapseTwo");
    if(sectionTwo.className.indexOf("show")>-1){
      sectionTwo.className = sectionTwo.className.replace("show", "collapsed");
    }
    else
    {
      sectionTwo.className = sectionTwo.className.trim() + " collapsed";
    }
  }

  viewCampaign(amp : Campaign){
    debugger;
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
