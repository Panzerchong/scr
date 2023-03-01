import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepnessLogPageRoutingModule } from './sleepness-log-routing.module';

import { SleepnessLogPage } from './sleepness-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepnessLogPageRoutingModule
  ],
  declarations: [SleepnessLogPage]
})
export class SleepnessLogPageModule {}
