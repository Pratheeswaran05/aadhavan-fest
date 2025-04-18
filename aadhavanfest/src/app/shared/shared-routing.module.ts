import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
