export class Campaign{

    campaignID : string = "";
    hospitalID : string = "";
    campaignName : string = "";
    bloodGroups : string = "";
    city : string = "";
    location : string = "";
    campaignDate : Date;
    timeSlots : number = 0;
    remarks  : string = "";
    status : string = "Draft";
    isPersistent : boolean = false;

    isValidCampaign(){
        if( this.campaignID == "" || 
            this.hospitalID == "" || 
            this.campaignName == "" ||  
            this.city == "" || 
            this.location == "" ||
            this.campaignDate == null || 
            this.timeSlots == 0){
            return false;
        }
        return true;
    }
}