import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HighlightsComponent } from '../features/highlights/highlights/highlights.component';
import { AchievementsComponent } from '../features/achievements/achievements/achievements.component';

const routes: Routes = [
  {
      path : 'header',
      component : HeaderComponent
    },
  {
      path : 'footer',
      component : FooterComponent
    },
  {
      path : 'sidebar',
      component : SidebarComponent
    },

    {
      path: 'highlights/:tab',
      component: HighlightsComponent
    },
    {
      path: 'achievements/:tab',
      component: AchievementsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
