import { Component } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showPicker = false;
  formattedString = '';
  dateValue = format(new Date(),'yyyy-MM-dd') + 'T09:00:00.000Z';
  constructor() {
    this.setToday();
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd') + 'T09:00:00.000Z'), 'MMM d, yyyy');
  }
  dateChanged(value: any){
    this.dateValue = value;
    this.formattedString = format(parseISO(value),'MMM d, yyyy');
    this.showPicker = false;
  }
}
