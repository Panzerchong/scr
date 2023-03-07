import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { SleepService } from '../../app/services/sleep.service';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isDateSame = false;
  recentOvernight: String;
  
  startdateValue = new Date().toISOString();
  enddateValue = new Date().toISOString();
  formattedStartDay = '';
  formattedEndDay = this.formattedStartDay;
  currentDate:string="";
  diffDuration:String="";
  overnightArray:OvernightSleepData[];
  dataOvernightArray:OvernightSleepData[];

  
  isModalOpen = false;
  async setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.currentRecord();
  }

  constructor(private sleepService:SleepService, private storageService:StorageService) {
    this.overnightArray=[];
    this.dataOvernightArray=[];
    this.currentRecord();
  }
  ngOnInit() {
    this.overnightArray =SleepService.AllOvernightData;
    this.dataOvernightArray =SleepService.AllOvernightData;
  }

  loadHistoryData(){
    this.currentRecord();
  }

  async loadData(){
    this.overnightArray=await this.storageService.getSleepData();
    this.dataOvernightArray=[];
    if(this.overnightArray!=null||this.overnightArray!=undefined){
      this.overnightArray.forEach(element => {
        this.dataOvernightArray.push(new OvernightSleepData(element.sleepStart,element.sleepEnd) )
      });
    }
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


  async addDateClicked(){

    let newStartDate = new Date(this.startdateValue);
    let newEndDate = new Date(this.enddateValue);
    let nightArray:OvernightSleepData[]=[];
    nightArray.push(new OvernightSleepData(newStartDate,newEndDate));
    this.currentDate=nightArray[0].dateString();
    this.diffDuration=nightArray[0].summaryString();


    //this.overnightArray.push(new OvernightSleepData(newStartDate,newEndDate));
    await this.storageService.addSleepData(new OvernightSleepData(newStartDate,newEndDate));
    
  }

  deleteLog(index:number){
    let check = confirm("Please confirm to delete this record?");
    if (check) {
      this.storageService.removeSleepItem(index)
      this.overnightArray.splice(index,1);
      this.dataOvernightArray.splice(index,1);
    }
  }

  currentRecord(){
    this.loadData();
    if(this.dataOvernightArray.length==0){
      this.currentDate = '';
      this.diffDuration ='';
    }
    else{
      let currentLength=this.dataOvernightArray.length;
      this.currentDate=this.dataOvernightArray[currentLength-1].dateString();
      this.diffDuration=this.dataOvernightArray[currentLength-1].summaryString();
       console.log("Duration " + this.diffDuration);
       console.log("current Date " + this.currentDate);
    }
  }


 




}

