import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './signup/components/login-form/login-form.component';
import { LearningLogComponent } from './learning-log/components/learning-log.component';
import { RoutingPaths } from './app.routes';
import { AuthGuard } from './core/auth/guards/auth-guards';

const routes: Routes = [
  {
    path: RoutingPaths.loginPath,
    component: LoginFormComponent,
  },
  {
    path: RoutingPaths.learningLogPath,
    component: LearningLogComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
