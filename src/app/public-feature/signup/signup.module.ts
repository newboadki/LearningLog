import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../core/auth/auth.module';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SignupRoutingModule,
  ],
  exports: [LoginFormComponent],
})
export class SignupModule {}
