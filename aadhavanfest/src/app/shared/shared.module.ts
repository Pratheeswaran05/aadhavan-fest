import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PreloaderComponent } from './preloader/preloader.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
  ]
})
export class SharedModule { }
