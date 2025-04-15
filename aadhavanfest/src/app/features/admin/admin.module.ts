import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OverviewComponent } from './overview/overview.component';
import { GalleryManagementComponent } from './gallery-management/gallery-management.component';
import { ManageVideosComponent } from './manage-videos/manage-videos.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePhotosComponent } from './manage-photos/manage-photos.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    OverviewComponent,
    GalleryManagementComponent,
    ManageVideosComponent,
    ManageCategoriesComponent,
    ManagePhotosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    SharedModule 
  ]
})
export class AdminModule { }
