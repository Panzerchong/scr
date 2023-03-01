import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverNightSleepPage } from './over-night-sleep.page';

const routes: Routes = [
  {
    path: '',
    component: OverNightSleepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverNightSleepPageRoutingModule {}
