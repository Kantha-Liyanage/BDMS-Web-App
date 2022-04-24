import { Console } from "console";
import { Utils } from "../utils/utils";

export class Donor{
    nic : string = "";
    password: string = "";
    firstName : string = "";
    lastName : string = "";
    dob : Date;
    gender : string = "Male";
    bloodGroup : string = "NN";
    city : string = "";
    email : string = "";
    phone : string = "";

    isValidRegistration(){
        if(this.nic == "" || this.password == "" || this.firstName == "" ||  this.lastName == "" ||  this.gender == ""){
            return false;
        }
        return true;
    }

    checkDOBRange() : boolean{
        debugger;
        var startDate = this.getMinDOB();
        var endDate = this.getMaxDOB();

        if (startDate <= this.dob && this.dob <= endDate) {
            return true;
        }
        else    {
            return false
        } 
    }

    getMinDOB() : Date{
        var date = new Date();
        date.setFullYear(date.getFullYear() - 60);
        console.log(date);
        return date;
    }

    getMaxDOB() : Date{
        var date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        console.log(date);
        return date;
    }
}
