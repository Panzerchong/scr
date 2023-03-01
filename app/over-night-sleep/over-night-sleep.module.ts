import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverNightSleepPageRoutingModule } from './over-night-sleep-routing.module';

import { OverNightSleepPage } from './over-night-sleep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverNightSleepPageRoutingModule
  ],
  declarations: [OverNightSleepPage]
})
export class OverNightSleepPageModule {}
