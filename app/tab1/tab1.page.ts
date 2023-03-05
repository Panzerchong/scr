import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
import { SleepService } from '../../app/services/sleep.service';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
// import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild('barChart') barChart;

  id:any;
  bars: any;
  colorArray: any;
  data:any;
  
  count:number = 0;
  showSleepDataCards: boolean;
  showSleepinessDataCards: boolean;
  overnightSleepDataArray: OvernightSleepData[];
  sleepinessDataArray:StanfordSleepinessData[];
  constructor(private sleepService:SleepService) { }
  ngOnInit(){
    this.showSleepDataCards = true;
    this.overnightSleepDataArray = SleepService.AllOvernightData;
    this.sleepinessDataArray = SleepService.AllSleepinessData;
    this.showSleepinessDataCards = false;
  }


  segmentChanged(ele:any){
    console.log('Segment changed', ele);
    console.log("event.detail.value: " + ele.detail.value);
    console.log("Array " + this.overnightSleepDataArray.length)
    if(ele.detail.value=="Sleep") {
      console.log("show sleep data!");
      this.showSleepDataCards = true; 
      this.showSleepinessDataCards = false;
    } else if (ele.detail.value=="Sleepiness"){
      console.log("show sleepiness data!");
      this.showSleepDataCards = false;
      this.showSleepinessDataCards = true;
    }
  }
}
 
    
  
  
 
  
  
