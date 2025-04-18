import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighlightsComponent } from './highlights/highlights.component';

const routes: Routes = [
    // { path: '', component: HighlightsComponent },
      { path: '', redirectTo: 'inside', pathMatch: 'full' }, // Default tab
      { path: ':tab', component: HighlightsComponent },      // Tab param route
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighlightsRoutingModule { }
