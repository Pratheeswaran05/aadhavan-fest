import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from '../../core/auth-guard.service';
import { ManageVideosComponent } from './manage-videos/manage-videos.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { GalleryManagementComponent } from './gallery-management/gallery-management.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }, // Protect Dashboard
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect `/admin` to `/admin/login`
  {
    path : 'signup',
    component : SignupComponent
  },

  { path: 'overview', component: OverviewComponent },
  { path: 'videos', component: ManageVideosComponent },
  { path: 'categories', component: ManageCategoriesComponent },
  { path: 'gallery', component: GalleryManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
