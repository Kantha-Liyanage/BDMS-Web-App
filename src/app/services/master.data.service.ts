import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private http: HttpClient) { }

  getCities(){
    let url : string = environment.apiBaseURL + "/Common/Cities";
    return this.http.get(url);  
  }

  getBloodGroups(){
    return [
      {id:"O+", name: "O Positive", selected: false},
      {id:"O-", name: "O Negative", selected: false},
      {id:"A+", name: "A Positive", selected: false},
      {id:"A-", name: "A Negative", selected: false},
      {id:"B+", name: "B Positive", selected: false},
      {id:"B-", name: "B Negative", selected: false},
      {id:"AB+", name: "AB Positive", selected: false},
      {id:"AB-", name: "AB Negative", selected: false}
    ];
  }

}
