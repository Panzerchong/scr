import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
import { SleepService } from '../../app/services/sleep.service';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { StorageService } from '../services/storage.service';
//import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild('barCanvas') barCanvas: ElementRef;
 
  barChart: any;
 
  data:any;
  duration:any = [];
  
 
  showSleepDataCards: boolean;
  showSleepinessDataCards: boolean;
  overnightSleepDataArray: OvernightSleepData[];
  sleepinessDataArray:StanfordSleepinessData[];
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
   
  }
  constructor(private sleepService:SleepService,private storageService:StorageService) { }
  async loadData(){
    let overnightArr =await this.storageService.getSleepData();
    let sleepinessArray=await this.storageService.getData();
    this.overnightSleepDataArray =[];
    this.sleepinessDataArray=[];

    if(sleepinessArray!=null||sleepinessArray!=undefined){
      sleepinessArray.forEach(element => {
        this.sleepinessDataArray.push(new StanfordSleepinessData(element.loggedComment,element.loggedValue,element.loggedAt) )
      });
    }

    if(overnightArr!=null||overnightArr!=undefined){
      overnightArr.forEach(element => {
        this.overnightSleepDataArray.push(new OvernightSleepData(element.sleepStart,element.sleepEnd) )
      });
    }
  }
  ngOnInit(){
    this.showSleepDataCards = true;
    this.overnightSleepDataArray = SleepService.AllOvernightData;
    this.sleepinessDataArray = SleepService.AllSleepinessData;
    this.showSleepinessDataCards = false; 
    this.loadData();
    
    
   
  }
  ionViewDidEnter() 
  {
    
     this.duration = [];
     this.defineChartData();
     this.barCharMethod();
     this.loadData();
   
     console.log("nihao "+ this.sleepinessDataArray);
     console.log("overnight "+ this.overnightSleepDataArray);
  }
  barCharMethod(){
    if(this.barChart !=null){
      this.barChart.clear();
      this.barChart.destroy();
    }
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['1','2','3','4','5','6','7'],
        datasets: [{
          label: 'Sleeping Duration',
          data: this.duration,
          fill: false,
          tension:0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          spanGaps: false,
        }]
      },
      
    });
  
  }

  segmentChanged(ele:any){
     console.log('Segment changed', ele);
    console.log("event.detail.value: " + ele.detail.value);
     console.log("Array " + this.overnightSleepDataArray.length)
    if(ele.detail.value=="Sleep") {   
      this.showSleepDataCards = true; 
      this.showSleepinessDataCards = false;  
 
    } else if (ele.detail.value=="Sleepiness"){
      this.showSleepDataCards = false;
      this.showSleepinessDataCards = true;
    }
  }
  //display line Chart 
  defineChartData() : void
   {
      let k : any;

      for(k in this.overnightSleepDataArray)
      {
        this.duration.push(this.overnightSleepDataArray[k].summaryDuration());
        console.log("Sleep  " +this.overnightSleepDataArray[k].dayWeekMonthString());
        console.log("nihao ");
        console.log("Sleep Log " + this.overnightSleepDataArray[k].summaryString());
      }
    
   }
   
   
}
 
    
  
  
 
  
  
