import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
  ]
})
export class AdminModule { }
