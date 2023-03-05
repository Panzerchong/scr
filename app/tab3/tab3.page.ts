import { Component } from '@angular/core';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { format} from 'date-fns';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  enterComment: string="";
  comment: string="";
  storeSleepiness: string="Sleepiness record";
  storeLevel:number=0;
  enterSleepiness={content:"",level:0};
  dateTime= format(new Date(),'yyyy-MM-dd')+'T08:00:00.000Z';
  
  currentDate:string="";
  currentLevel:string="";

  sleepinessArray: StanfordSleepinessData[];

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.currentRecord();
  }

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

  constructor(private sleepService:SleepService) {
    this.sleepinessArray=[];
  }

  ngOnItit(){
    this.sleepinessArray=SleepService.AllSleepinessData;
  }

  onClick(){
    this.comment=this.enterComment;
    this.storeSleepiness=this.enterSleepiness.content;
    //this.storeLevel=this.enterSleepiness.level;
    let newDateTime=new Date(this.dateTime);
    
    //this.currentLevel=this.storeLevel.toString()+": ";
    //this.currentDate=newDateTime.toString().substring(4,21)
    
    this.sleepinessArray.push(new StanfordSleepinessData(this.enterComment,this.enterSleepiness.level,newDateTime));

    this.currentRecord();
    // console.log(this.newDateTime)
  }

  deleteItem(index:number){
    this.sleepinessArray.splice(index,1);
  }

  currentRecord(){
    if(this.sleepinessArray.length==0){
      this.currentLevel="";
      this.currentDate="";
      this.storeSleepiness="Sleepiness record"
      this.comment="";
    }
    else{
      let currentLength=this.sleepinessArray.length;
      this.currentDate=this.sleepinessArray[currentLength-1].dateString();
      this.comment=this.sleepinessArray[currentLength-1].getComment();
      this.storeSleepiness=this.sleepinessArray[currentLength-1].summaryString();
    }
  }
}
