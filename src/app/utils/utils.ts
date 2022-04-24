export class Utils{
    public static toAngularDate(date : string) : any{
        var temp = date.substring(0,10).split("-");
        return { year: parseInt(temp[0]), month:parseInt(temp[1]), day: parseInt(temp[2]) };
    }

    public static toDotNetDate(date : any) : string{
        return date["year"] + "-" + Utils.to2Digits(date["month"]) + "-" + Utils.to2Digits(date["day"]);
    }   
    
    public static toDisplayDate(date : string) : string{
        return date.substring(0,10);
    }

    public static toAngularStringDate(date : Date){
        return Utils.toAngularDate(date.getFullYear() + "-" + Utils.to2Digits(date.getMonth()) + "-" + Utils.to2Digits(date.getDay()));
    }

    private static to2Digits(val : any) : string{
        if(val<10){
            return '0' + val;
        }
        else{
            return val;
        }
    }
}