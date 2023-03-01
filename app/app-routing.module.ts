import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'over-night-sleep',
    loadChildren: () => import('./over-night-sleep/over-night-sleep.module').then( m => m.OverNightSleepPageModule)
  },
  {
    path: 'sleepness-log',
    loadChildren: () => import('./sleepness-log/sleepness-log.module').then( m => m.SleepnessLogPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
