import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/models/appointment';
import { Campaign } from 'src/app/models/campaign';
import { TimeSlot } from 'src/app/models/timeslot';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  campaign : Campaign;
  timeSlots : TimeSlot[] = [];
  appointment : Appointment;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService) { 
    this.appointment = new Appointment();
    debugger;
  }

  ngOnInit() {
    this.setTimeSlots();
  }

  setTimeSlots(){
    this.timeSlots = [];
    let checked = 1;
    for (let index = 0; index < this.campaign.timeSlots; index++) {
      let timeslot = new TimeSlot();
      timeslot.slotNumber = index + 1;
      timeslot.text = "5";
      const element = this.timeSlots.push(timeslot);
    }
  }

  save(){}

  cancel(){
    this.activeModal.dismiss('Cross click');
  }  
}
