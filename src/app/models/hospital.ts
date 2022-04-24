export class Hospital{
    hospitalID : string = "";
    name : string = "";
    address  : string = "";
    contactNo1 : string = "";
    contactNo2 : string = "";
    city : string = "";
    password  : string = "";

    isValidRegistration(){
        if(this.hospitalID == "" || this.name == "" || this.address == "" ||  this.password == ""){
            return false;
        }
        return true;
    }
}