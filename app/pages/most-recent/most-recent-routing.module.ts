import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostRecentPage } from './most-recent.page';

const routes: Routes = [
  {
    path: '',
    component: MostRecentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostRecentPageRoutingModule {}
