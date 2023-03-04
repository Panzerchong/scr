import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostRecentPageRoutingModule } from './most-recent-routing.module';

import { MostRecentPage } from './most-recent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostRecentPageRoutingModule
  ],
  declarations: [MostRecentPage]
})
export class MostRecentPageModule {}
