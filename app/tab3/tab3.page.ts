import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { format} from 'date-fns';
import { SleepService } from '../services/sleep.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{

  enterComment: string="";
  comment: string="";
  storeSleepiness: string="Sleepiness record";
  storeLevel:number=0;
  enterSleepiness={content:"",level:0};
  dateTime= format(new Date(),'yyyy-MM-dd')+'T08:00:00.000Z';
  
  currentDate:string="";
  currentLevel:string="";

  sleepinessArray: StanfordSleepinessData[];

  dataSleepinessArray: StanfordSleepinessData[];
  hasData: boolean = false;

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

  constructor(private sleepService:SleepService, private StorageService:StorageService) {
    this.sleepinessArray=[];
    this.dataSleepinessArray=[];
    this.loadData();
    this.currentRecord();
  }

  isModalOpen = false;
  async setOpen(isOpen: boolean) {
    this.loadData();
    this.currentRecord();
    this.isModalOpen = isOpen;
  }

  ngOnInit(){
    this.dataSleepinessArray=SleepService.AllSleepinessData;
  }

  async loadData(){
    this.sleepinessArray=await this.StorageService.getData();
    this.dataSleepinessArray=[];
    if(this.sleepinessArray!==null||this.sleepinessArray!==undefined){
      this.sleepinessArray.forEach(element => {
        this.dataSleepinessArray.push(new StanfordSleepinessData(element.loggedComment,element.loggedValue,element.loggedAt) )
      });
    }
  }

  loadHistoryData(){
    this.loadData();
    this.currentRecord();
  }

  async onClick(){
    this.loadData();
    this.currentRecord()
    this.comment=this.enterComment;
    this.storeSleepiness=this.enterSleepiness.level+": "+this.enterSleepiness.content;
    //this.storeLevel=this.enterSleepiness.level;
    let newDateTime=new Date(this.dateTime);
    
    //this.currentLevel=this.storeLevel.toString()+": ";
    //this.currentDate=newDateTime.toString().substring(4,21)
    
    //this.sleepinessArray.push(new StanfordSleepinessData(this.enterComment,this.enterSleepiness.level,newDateTime));

    await this.StorageService.addData(new StanfordSleepinessData(this.enterComment,this.enterSleepiness.level,newDateTime));
    
  }

  currentRecord(){
    if(this.dataSleepinessArray.length==0){
      this.currentLevel="";
      this.currentDate="";
      this.storeSleepiness="Sleepiness record"
      this.comment="";
    }
    else{
      let currentLength=this.dataSleepinessArray.length;
      this.currentDate=this.dataSleepinessArray[currentLength-1].dateString();
      this.comment=this.dataSleepinessArray[currentLength-1].getComment();
      this.storeSleepiness=this.dataSleepinessArray[currentLength-1].summaryString();
      // this.comment=this.sleepinessArray[currentLength-1].loggedComment;
      // this.storeSleepiness=this.comment;
      // this.currentDate=this.comment;
    }
  }


  async deleteItem(index:number){
    // let check = confirm("Please confirm to delete this record?");
    // if (check) {
    
    // }
    this.StorageService.removeItem(index);
    this.sleepinessArray.splice(index,1);
    this.dataSleepinessArray.splice(index,1);
  }

  // onClick(){
  //   this.comment=this.enterComment;
  //   this.storeSleepiness=this.enterSleepiness.content;
  //   //this.storeLevel=this.enterSleepiness.level;
  //   let newDateTime=new Date(this.dateTime);
    
  //   //this.currentLevel=this.storeLevel.toString()+": ";
  //   //this.currentDate=newDateTime.toString().substring(4,21)
    
  //   this.sleepinessArray.push(new StanfordSleepinessData(this.enterComment,this.enterSleepiness.level,newDateTime));

  //   this.currentRecord();
  //   // console.log(this.newDateTime)
  // }

  // deleteItem(index:number){
  //   // let check = confirm("Please confirm to delete this record?");
  //   // if (check) {
    
  //   // }

  //   this.sleepinessArray.splice(index,1);
  // }
}


