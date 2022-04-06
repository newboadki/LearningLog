import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './authentication/components/login-form/login-form.component';
import { AuthGuard } from './authentication/guards/auth-guards';

export class RoutingPaths {
  public static loginPath = 'login';
}
const routes: Routes = [
  {
    path: RoutingPaths.loginPath,
    component: LoginFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
