import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	sleepStart:Date;
	sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		if(difference_ms < 0){
			difference_ms = 0;
		  }
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	//tab1
	summaryDuration():number {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		if(difference_ms < 0){
			difference_ms = 0;
		  }
		// Convert to hours and minutes
		var hour = Math.floor(difference_ms / (1000*60*60));
		var minutes =  Math.floor(difference_ms / (1000*60) % 60);
		var covertMinToHour = minutes/60;
		var total = hour + covertMinToHour;
		return Math.round(total*100) /100;
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
