import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Tab2Page } from '../../app/tab2/tab2.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OvernightSleepData  } from '../../app/data/overnight-sleep-data';
import { SleepService } from '../../app/services/sleep.service';
// import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  @ViewChild('barChart') barChart;

  id:any;
  bars: any;
  colorArray: any;
  data:any;
  durationHourArr:Tab2Page[];
  count:number = 0;
 
  overnightSleepDataArray: OvernightSleepData[];
  constructor(private sleepService:SleepService) { 
    
    this.durationHourArr = [];
    //this.loggedDuration = loggedDuration;
    this.overnightSleepDataArray = SleepService.AllOvernightData;
   
  }


  ionViewDidEnter() {
    this.createBarChart();  
    console.log("Over " + this.overnightSleepDataArray[0].dateString());
  }

  createBarChart() {
    
    
    if(this.bars !=null){
      this.bars.clear();
      this.bars.destroy();
    }
    
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Log Sleep',
          data: ['2.5', '3.8', '5', '6.9', '6.9', '7.5', '18'],
          //data: this.tab2.durationArr,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
    
    });
  }
}
  
 
  
  
