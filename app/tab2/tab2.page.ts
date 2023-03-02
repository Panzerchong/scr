import { Component } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showPicker = false;
  formattedString = '';
  formattedBedTime = '';
  formattedEndDay = '';
  formattedWakeUp = '';
  dateValue = format(new Date(),'yyyy-MM-dd');
  constructor() {
    this.setToday();
    this.setBedTime();
    this.setEndDay();
    this.setWakeUp();
    
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
    console.log(this.formattedString)
    this.showPicker = true; 
  }
  
  timeChanged(ele: any){
    this.dateValue = ele;
    this.formattedBedTime = format(parseISO(ele),'HH:mm aaa');
    this.showPicker = true;
    console.log(this.formattedBedTime)
  
  }
  endDateChanged(value: any){
    this.dateValue = value;
    this.formattedEndDay = format(parseISO(value),'MMM d, yyyy');
    console.log(this.formattedEndDay)
    this.showPicker = true; 
  }
  wakeUpTimeChanged(ele: any){
    this.dateValue = ele;
    this.formattedWakeUp = format(parseISO(ele),'HH:mm aaa');
    this.showPicker = true;
    console.log(this.formattedWakeUp)
  
  }
}

