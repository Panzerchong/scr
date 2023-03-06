import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
import { SleepService } from '../../app/services/sleep.service';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
//import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  barChart: any;
  id:any;
  lines: any;
  doughnutChart: any;
  colorArray: any;
  data:any;
  duration:any = [];
  categoris:any=[];
  uniqueCategory:any=[];

  count:number = 0;
  arr:any =[];
  sleepniessDate:any=[];
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
    //this.defineChartData();
    //this.barCharMethod();
    
  }
  ionViewDidEnter() 
  {
     this.uniqueCategory =[];
     this.categoris =[];
     this.duration = [];
     this.defineChartData();
     this.barCharMethod();
     this.doughnutChartMethod();
     this.defineChartSleepniessData();
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
  doughnutChartMethod(){
    if(this.doughnutChart !=null){
      this.doughnutChart.clear();
      this.doughnutChart.destroy();
    }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.uniqueCategory,
        datasets: [{
          label: 'Rating of Sleepiness Scale',
          data: [1,2,3,4,5,6,7],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(13, 12, 255, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#FF7814',
            '#FFC324'

          ]
        }]
      }
    });
  }
  segmentChanged(ele:any){
    console.log('Segment changed', ele);
    console.log("event.detail.value: " + ele.detail.value);
    console.log("Array " + this.overnightSleepDataArray.length)
    if(ele.detail.value=="Sleep") {
      console.log("show sleep data!");
      this.showSleepDataCards = true; 
      this.showSleepinessDataCards = false;
      //this.createBarChart();  
      console.log("created chart");
 
    } else if (ele.detail.value=="Sleepiness"){
      
      
      
      console.log("show sleepiness data!");
      this.showSleepDataCards = false;
      this.showSleepinessDataCards = true;
    }
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
   defineChartSleepniessData() : void
   {
      let k : any;

      for(k in this.sleepinessDataArray)
      {
       
         let convert = this.categoris.push(this.sleepinessDataArray[k].summaryString());
         this.sleepniessDate.push(this.sleepinessDataArray[k].dateString())

         console.log("Sleepniess " + this.sleepinessDataArray[k].summaryString());
         console.log("Categoris array " + this.categoris);
         console.log("Sleepniess date " + this.sleepinessDataArray[k].dateString());
         
      }
      this.arr = this.categoris;
         function removeDuplicates(arr) {
          return arr.filter((item,
              index) => arr.indexOf(item) === index);
        }
        console.log("Removed " + removeDuplicates(this.arr));
       
      this.uniqueCategory.push(...removeDuplicates(this.arr));
      this.uniqueCategory.sort();
        console.log("Removed1111 " + this.uniqueCategory);
   }
   
}
 
    
  
  
 
  
  
