import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsComponent } from './achievements/achievements.component';

const routes: Routes = [
  // { path: '', component: AchievementsComponent },
      { path: '', redirectTo: 'district', pathMatch: 'full' }, // Default tab
      { path: ':tab', component: AchievementsComponent },      // Tab param route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementsRoutingModule { }
