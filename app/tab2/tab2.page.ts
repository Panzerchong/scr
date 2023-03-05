import { Component } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { SleepService } from '../../app/services/sleep.service';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
import { Tab1Page } from '../../app/tab1/tab1.page';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  isDateSame = false;
  overnightArray: String[];
  recentOvernight: String;

  testovernightArray:OvernightSleepData[];
 
  startdateValue = new Date().toISOString();
  enddateValue = new Date().toISOString();
  formattedStartDay = '';
  formattedEndDay = this.formattedStartDay;
  
  constructor(private sleepService:SleepService) {
    
  }
  ngOnInit() {
    this.testovernightArray =SleepService.AllOvernightData;
    console.log("Start date " + this.startdateValue);
    console.log("End date " + this.enddateValue);
  }
  startDateChanged(value: any){
    this.startdateValue = value;
    this.formattedStartDay = format(parseISO(value),'MMM d, yyyy');

    this.formattedEndDay = this.formattedStartDay;
    console.log("Start date " + this.formattedStartDay);
    console.log("End date " + this.formattedEndDay);
    if(this.formattedEndDay == this.formattedStartDay){
      console.log("Same day");
      this.isDateSame = true;
    }else{
      console.log("not Same day");
      this.isDateSame = false;
    }
  
  }
  endDateChanged(value: any){
    this.enddateValue = value;
    this.formattedEndDay = format(parseISO(value),'MMM d, yyyy');

    console.log("End date " + this.enddateValue);
    

    if(this.formattedStartDay == this.formattedEndDay){
      console.log("Same day");
      this.isDateSame = true;
    }else{
      console.log("not Same day");
      this.isDateSame = false;
    }
  }
  // deleteLog(index:number){
  //   console.log("works " + index);
  //   var removeArr = this.overnightArray.splice(index,1);
  //   console.log(" The removed element from the given array is: " + removeArr);
  //   console.log(this.overnightArray.length);
  // }
}

