import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { SleepService } from '../../app/services/sleep.service';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  isDateSame = false;
  
  recentOvernight: String;

  overnightArray:OvernightSleepData[];
 
  startdateValue = new Date().toISOString();
  enddateValue = new Date().toISOString();
  formattedStartDay = '';
  formattedEndDay = this.formattedStartDay;
  currentDate:string="";
  diffDuration:String="";

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.currentRecord();
  }

  constructor(private sleepService:SleepService) {
    
  }
  ngOnInit() {
    this.overnightArray =SleepService.AllOvernightData;
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
  addDateClicked(){
    let newStartDate = new Date(this.startdateValue);
    console.log("New start Day: " + newStartDate);
    let newEndDate = new Date(this.enddateValue);
    console.log("New End Day: " + newEndDate);

    this.overnightArray.push(new OvernightSleepData(newStartDate,newEndDate));
    this.currentRecord();
  }
  deleteLog(index:number){
    console.log("works " + index);
    var removeArr = this.overnightArray.splice(index,1);
    console.log(" The removed element from the given array is: " + removeArr);
    console.log(this.overnightArray.length);
  }
  currentRecord(){
    if(this.overnightArray.length==0){
      this.currentDate = '';
      this.diffDuration ='';
    }
    else{
      let currentLength=this.overnightArray.length;
      this.currentDate=this.overnightArray[currentLength-1].dateString();
      this.diffDuration=this.overnightArray[currentLength-1].summaryString();
       console.log("Duration " + this.diffDuration);
       console.log("current Date " + this.currentDate);
    }
  }
}

