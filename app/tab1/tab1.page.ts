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
  doughnutChart: any;
  data:any;
  duration:any = [];
  categoris:any=[];
  uniqueCategory:any=[];
  sleepinessLevelArr:any=[];
  countValues:any=[];
  countKeys:any=[];
  arr:any =[];
  sleepniessDate:any=[];
  countsDate;
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
  }
  ionViewDidEnter() 
  {
     this.sleepinessLevelArr =[];
     this.uniqueCategory =[];
     this.categoris =[];
     this.duration = [];
     this.countsDate ={};
     this.arr=[];
     this.sleepniessDate =[];
     this.countValues=[];
     this.countKeys=[];
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
      type: 'bar',
      data: {
        labels: this.countValues,
        datasets: [{
          label: 'Rating of Sleepiness',
          data: [1,1,1,1,1,1,1,1],
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
    // console.log('Segment changed', ele);
    // console.log("event.detail.value: " + ele.detail.value);
    // console.log("Array " + this.overnightSleepDataArray.length)
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
        
      }
     
   }
   defineChartSleepniessData() : void
   {
      let k : any;

      for(k in this.sleepinessDataArray)
      {
       
         this.categoris.push(this.sleepinessDataArray[k].summaryString());
         this.sleepniessDate.push(this.sleepinessDataArray[k].dayWeekMonthString())
         this.sleepinessLevelArr.push(this.sleepinessDataArray[k].loggedValue);
         //console.log("Sleepniess " + this.sleepinessDataArray[k].summaryString());
         //console.log("Categoris array " + this.sleepinessDataArray[k].);
        // console.log("Sleepniess date " + this.sleepinessDataArray[k].dayWeekMonthString());
         //console.log("Sleepiness level " + this.sleepinessDataArray[k].loggedValue);
         
      }
      this.arr = this.sleepniessDate;
         function removeDuplicates(arr) {
          return arr.filter((item,
              index) => arr.indexOf(item) === index);
        }
        console.log("Removed " + removeDuplicates(this.arr));
       
        this.uniqueCategory.push(...removeDuplicates(this.arr));
        //this.uniqueCategory.sort();
        console.log("Removed1111 " + this.uniqueCategory);
        const map = {
          'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,
          'Sunday': 7
       };
       this.uniqueCategory.sort((a, b) => {
          return map[a.day] - map[b.day];
       });
        console.log("Sorted " + this.uniqueCategory);
        const counts ={};
        this.countsDate = counts;
        this.sleepniessDate.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        console.log(counts)
        console.log("Keys " + Object.keys(this.countsDate));
        console.log("values " + Object.values(this.countsDate));

        
        // Object.keys(counts).map(function (key) {
         
        //   // Using Number() to convert key to number type
        //   // Using obj[key] to retrieve key value
        //  countValues.push(key);
        //   return (key);
        // });
        // this.countKeys = Object.keys(counts).map(function (key) {
         
        // // Using Number() to convert key to number type
        // // Using obj[key] to retrieve key value
        // return [String(counts[key])];
        // });
        this.countValues.push(Object.values(this.countsDate));
        this.countKeys.push(Object.keys(this.countsDate));

        //console.log("count Results " + result[0]);
        //console.log("count Results " + result1);
      
        console.log("count Keys " + this.countKeys);
        console.log("count Keys " + typeof(this.countKeys[1]));
        console.log("count Values " + this.countValues);
        console.log("count Values " + (this.countValues[1]));
   }
   
}
 
    
  
  
 
  
  
