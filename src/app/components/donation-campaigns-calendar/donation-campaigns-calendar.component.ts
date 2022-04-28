import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { Campaign } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { MasterDataService } from 'src/app/services/master.data.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-donation-campaigns-calendar',
  templateUrl: './donation-campaigns-calendar.component.html',
  styleUrls: ['./donation-campaigns-calendar.component.css']
})
export class DonationCampaignsCalendarComponent implements OnInit {

  title : string = "Blood Donation Management System - Campaigns";
  campaigns : Campaign[];
  city : string = "";
  cities : string[] = [];

  constructor(private masterDataService : MasterDataService,
              private campaignService : CampaignService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
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
  }

  findCampaigns() {
    debugger;
    this.spinner.show();
    this.campaigns = [];
    debugger;
    this.campaignService.getCityOpenAll(this.city).subscribe(
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

  createAppointment(campaign : Campaign){
    alert(campaign.timeSlots);
  }

  getFriendlyDate(date : any){
    return Utils.toDisplayDate(date);
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }

}
