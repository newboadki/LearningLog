import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authModuleHttpInterceptorProviders } from './interceptors/auth-module-interceptors-index';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    authModuleHttpInterceptorProviders,
    { provide: Storage, useValue: localStorage },
  ],
})
export class AuthModule {}
