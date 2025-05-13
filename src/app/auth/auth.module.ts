import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NbAuthModule } from '@nebular/auth';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // Nebular Modules
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbAuthModule.forRoot({}),
    AuthRoutingModule
  ]
})
export class AuthModule {}
