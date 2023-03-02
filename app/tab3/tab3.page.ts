import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // sleepiness:string="";
  // sleepinessLevel:number=0;

  enterComment: string="";
  comment: string="";
  storeSleepiness: string="";
  storeLevel:number=0;

  event=[
    {content: "",
    level: ""}
  ];

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

  

  constructor() {}


  onClick(){
    this.comment=this.enterComment;
  }

  recordSleepiness(event){
    
    this.storeSleepiness=event.content;
    this.storeLevel-event.level;
    console.log(this.storeSleepiness);
  }

}
