import { Component } from '@angular/core';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})



export class Tab3Page {

  enterComment: string="";
  comment: string="";
  storeSleepiness: string="";
  storeLevel:number=0;
  enterSleepiness={content:"",level:0};

  newDateTime= format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  dateTime:Date=new Date('1990-12-20');



  // dateTime= format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  // newDateTime= format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  // enterSleepiness= new StanfordSleepinessData(1, this.date);
  sleepinessArray: StanfordSleepinessData[];

  options=[
    {content: "Feeling active and vital",
    level: "1"},
    {content: "Functioning at a high level, but not at peak; able to concentrate",
    level: "2"},
    {content: "Relaxed; awake; not at full alertness; responsive",
    level: "3"},
    {content: "A little foggy; not at peak; let down",
    level: "4"},
    {content: "Fogginess; beginning to lose interest in remaining awake; slowed down",
    level: "5"},
    {content: "Sleepiness; prefer to be lying down; fighting sleep; woozy",
    level: "6"},
    {content: "Almost in reverie; sleep onset soon; lost struggle to remain awake",
    level: "7"}
  ];

  constructor() {
    this.sleepinessArray=[];
  }

  onClick(){
    this.comment=this.enterComment;
    this.storeSleepiness=this.enterSleepiness.content;
    this.storeLevel=this.enterSleepiness.level;
    // this.newDateTime=this.dateTime;


    //this.sleepinessArray.push(new StanfordSleepinessData(this.enterSleepiness.level,this.dateTime));
    console.log(this.storeSleepiness)
    console.log(this.storeLevel)
    // console.log(this.newDateTime)
  }

}
