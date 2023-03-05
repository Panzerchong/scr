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

  showPicker = false;
  formattedString = '';
  test ='';
  formattedBedTime = '';
  formattedEndDay = '';
  formattedWakeUp = '';

  currentDateLog ='';
  currentDateDuration='';


  isDateSame = false;
  dateValue = format(new Date(),'yyyy-MM-dd')+'T00:00:00.000Z';
  bedTimeValue =format(new Date(),'yyyy-MM-dd')+ 'T00:00:00.000Z';
  endDateValue =format(new Date(),'yyyy-MM-dd') + 'T00:00:00.000Z';
  wakeUpTimeValue =format(new Date(),'yyyy-MM-dd') + 'T00:00:00.000Z';

  isModalOpen = false;
  overnightArray: String[];
  recentOvernight: String;
  durationArr:Tab1Page[];
  testovernightArray:OvernightSleepData[];
 
  

 
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  constructor() {
    this.setToday();
    this.setBedTime();
    this.setEndDay();
    this.setWakeUp();

    this.overnightArray = new Array;
    this.durationArr =[];
    this.testovernightArray =[];
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
    this.bedTimeValue = this.dateValue;
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
    console.log("kkk" + this.formattedBedTime)
   
  
  }
  endDateChanged(value: any){
    this.endDateValue = value;
    this.wakeUpTimeValue = this.endDateValue;
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
    console.log("Start Day: " + this.dateValue);
    console.log("End Day: " + this.endDateValue);
    console.log("Bed Time: " + this.formattedBedTime);
    console.log("Wake Up Time: " + this.wakeUpTimeValue);

    var startDay = new Date(this.dateValue);
    var startDay_ms = startDay.getTime();
    
    var endDay = new Date(this.endDateValue);
    var endDay_ms = endDay.getTime();
    var diffDay = endDay_ms - startDay_ms;
    if(diffDay < 0){
      diffDay = 0;
    }
  


    var hour_day = Math.floor(diffDay / (1000*60*60));
    var minutes_day = Math.floor(diffDay / (1000*60) % 60);

    var sleepTime = new Date(this.bedTimeValue);
    var slepTime_ms = sleepTime.getTime();
    var totalStartDay = startDay_ms + slepTime_ms;

    console.log("New date " + startDay);
    console.log("New time " + sleepTime);

    var waketime = new Date(this.wakeUpTimeValue);
    var waketime_ms = waketime.getTime();
    //OvernigthSleepData Array contains start-day-time and end-day-time together
    
    this.testovernightArray.push(new OvernightSleepData(sleepTime,waketime));
    let currentLength= this.testovernightArray.length;
    console.log("testoverNight " + this.testovernightArray[currentLength-1].dateString());
    this.currentDateLog = this.testovernightArray[currentLength-1].dateString();
    this.currentDateDuration = this.testovernightArray[currentLength-1].summaryString();
    console.log("Duration current " + this.currentDateDuration);



    var diffTime = waketime_ms - slepTime_ms;
    if(diffTime < 0){
      diffTime = 0;
    }
    var hour = Math.floor(diffTime / (1000*60*60));
    var minutes = Math.floor(diffTime / (1000*60) % 60);

    var total_hour = hour_day + hour;
    var total_minutes = minutes_day + minutes;
    console.log("Different Time " + diffTime);
    console.log("Diff " + diffDay);
    let oneDay = "From " + this.formattedString + " to " + this.formattedEndDay 
                 + " \nSleep Duration: " + total_hour + " hour " + total_minutes + " minutes";
    
    var duration_hour =  total_hour+ total_minutes/60;  
    
    
    
    console.log("Duration hour: " + this.durationArr);     
    this.overnightArray.push(oneDay);
    //this.overnightArray.push(this.formattedEndDay);
    
    this.recentOvernight= this.overnightArray[this.overnightArray.length-1]; 
    console.log("length " +  this.overnightArray.length);
  }
  deleteLog(index:number){
    console.log("works " + index);
    var removeArr = this.overnightArray.splice(index,1);
    console.log(" The removed element from the given array is: " + removeArr);
    console.log(this.overnightArray.length);
  }
}

