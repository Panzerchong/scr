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
  lines: any;
  colorArray: any;
  data:any;
  duration:any = [];
  
  count:number = 0;
  showSleepDataCards: boolean;
  showSleepinessDataCards: boolean;
  overnightSleepDataArray: OvernightSleepData[];
  sleepinessDataArray:StanfordSleepinessData[];
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
   
  }
  constructor(private sleepService:SleepService) { }
  ngOnInit(){
    this.showSleepDataCards = true;
    this.overnightSleepDataArray = SleepService.AllOvernightData;
    this.sleepinessDataArray = SleepService.AllSleepinessData;
    this.showSleepinessDataCards = false;
    //this.createBarChart();
    this.defineChartData();
  }
  ionViewDidEnter() 
  {
    
     this.createBarChart();   
     
  }

  segmentChanged(ele:any){
    console.log('Segment changed', ele);
    console.log("event.detail.value: " + ele.detail.value);
    console.log("Array " + this.overnightSleepDataArray.length)
    if(ele.detail.value=="Sleep") {
      console.log("show sleep data!");
      this.showSleepDataCards = true; 
      this.showSleepinessDataCards = false;
      this.createBarChart();  
      console.log("created chart");
     

      
    } else if (ele.detail.value=="Sleepiness"){
      
      this.createBarChart();  
      
      console.log("show sleepiness data!");
      this.showSleepDataCards = false;
      this.showSleepinessDataCards = true;
    }
  }
  createBarChart() {

    console.log("created chart");
    console.log("created chart");
    if(this.lines !=null){
      this.lines.clear();
      this.lines.destroy();
    }

    this.lines = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['1','2','3','4','5','6','7'],
        datasets: [{
          label: 'Sleeping Duration',
          data: this.duration,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
    });
  }
  defineChartData() : void
   {
      let k : any;

      for(k in this.overnightSleepDataArray)
      {
         let convert = this.duration.push(this.overnightSleepDataArray[k].summaryDuration());

         console.log("duration " + this.overnightSleepDataArray[k].summaryDuration());
         console.log("Duration array " + this.duration);
      }
     
   }
   
}
 
    
  
  
 
  
  
