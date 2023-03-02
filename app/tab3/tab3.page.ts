import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  options=[
    {"content": "the first one",
    "level": "1"},
    {"content": "second one",
    "level": "2"}
  ];


  constructor() {}

  enterComment: string="";
  comment: string="";

  onClick(){
    this.comment=this.enterComment;
  }

}
