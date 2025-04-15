import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PreloaderComponent } from './preloader/preloader.component';

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
  // {
  //     path : 'preloader',
  //     component : PreloaderComponent
  //   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
