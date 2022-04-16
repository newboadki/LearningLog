import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../core/auth/auth.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthModule],
  exports: [LoginFormComponent],
})
export class SignupModule {}
