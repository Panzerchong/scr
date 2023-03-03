import { Component } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { SleepService } from '../../app/services/sleep.service';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showPicker = false;
  formattedString = '';
  test ='';
  formattedBedTime = '';
  formattedEndDay = '';
  formattedWakeUp = '';
  isDateSame = false;
  dateValue = format(new Date(),'yyyy-MM-dd');
  bedTimeValue =format(new Date(),'yyyy-MM-dd');
  endDateValue =format(new Date(),'yyyy-MM-dd');
  wakeUpTimeValue =format(new Date(),'yyyy-MM-dd');

  
  overnightArray: String[];
  recentOvernight: String;
  constructor() {
    this.setToday();
    this.setBedTime();
    this.setEndDay();
    this.setWakeUp();
    
    this.overnightArray = new Array;
    this.recentOvernight= this.overnightArray[this.overnightArray.length-1]; 
    console.log(this.overnightArray.length);
    
  }


  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')), 'MMM d, yyyy');
  }
  setBedTime(){
    this.formattedBedTime = format(parseISO(format(new Date(),'yyyy-MM-dd')), 'HH:mm aaa');
  }
  setEndDay(){
    this.formattedEndDay = format(parseISO(format(new Date(),'yyyy-MM-dd')), 'MMM d, yyyy');
  }
  setWakeUp(){
    this.formattedWakeUp = format(parseISO(format(new Date(),'yyyy-MM-dd')), 'HH:mm aaa');
  }
  dateChanged(value: any){
    this.dateValue = value;
    this.formattedString = format(parseISO(value),'MMM d, yyyy');
    this.showPicker = true; 
    this.formattedEndDay = this.formattedString;
    console.log(this.formattedString)
    if(this.formattedEndDay == this.formattedString){
      console.log("Same day");
      this.isDateSame = true;
    }else{
      console.log("not Same day");
      this.isDateSame = false;
    }
  
  }
  
  timeChanged(ele: any){
    this.bedTimeValue = ele;
    this.formattedBedTime = format(parseISO(ele),'HH:mm aaa');
    this.showPicker = true;
    this.formattedWakeUp = this.formattedBedTime;
    console.log(this.formattedBedTime)
   
  
  }
  endDateChanged(value: any){
    this.endDateValue = value;
    this.formattedEndDay = format(parseISO(value),'MMM d, yyyy');
    this.showPicker = true; 
    if(this.dateValue == this.endDateValue){
      console.log("Same day");
      this.isDateSame = true;
    }else{
      console.log("not Same day");
      this.isDateSame = false;
    }
    console.log(this.formattedEndDay)
    console.log("End day called");
    
  }
  wakeUpTimeChanged(ele: any){
    this.wakeUpTimeValue = ele;
    this.formattedWakeUp = format(parseISO(ele),'HH:mm aaa');
    this.showPicker = true;
    console.log(this.formattedWakeUp)
   
  
  }
  addDateClicked(){
    console.log("Start Day: " + this.formattedString);
    console.log("End Day: " + this.formattedEndDay);
    console.log("Bed Time: " + this.formattedBedTime);
    console.log("Wake Up Time: " + this.formattedWakeUp);

    var startDay = new Date(this.dateValue);
    var startDay_ms = startDay.getTime();

    var endDay = new Date(this.endDateValue);
    var endDay_ms = endDay.getTime();

    var diffDay = endDay_ms - startDay_ms;

    var hour_day = Math.floor(diffDay / (1000*60*60));
    var minutes_day = Math.floor(diffDay / (1000*60) % 60);

    var sleepTime = new Date(this.bedTimeValue);
    var slepTime_ms = sleepTime.getTime();

    var waketime = new Date(this.wakeUpTimeValue);
    var waketime_ms = waketime.getTime();

    var diffTime = waketime_ms - slepTime_ms;

    var hour = Math.floor(diffTime / (1000*60*60));
    var minutes = Math.floor(diffTime / (1000*60) % 60);

    var total_hour = hour_day + hour;
    var total_minutes = minutes_day + minutes;
    console.log("Different Time " + diffTime);
    console.log("Diff " + diffDay);
    let oneDay = "From " + this.formattedString + " to " + this.formattedEndDay 
                 + " \nSleep Duration: " + total_hour + " hour " + total_minutes + " minutes";
    
    this.overnightArray.push(oneDay);
    //this.overnightArray.push(this.formattedEndDay);
    
    this.recentOvernight= this.overnightArray[this.overnightArray.length-1]; 
    console.log("length " +  this.overnightArray.length);
  }
}

