import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepnessLogPage } from './sleepness-log.page';

const routes: Routes = [
  {
    path: '',
    component: SleepnessLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepnessLogPageRoutingModule {}
