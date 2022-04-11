import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './authentication/components/login-form/login-form.component';
import { AuthGuard } from './authentication/guards/auth-guards';
import { LearningLogComponent } from './learning-log/components/learning-log.component';
import { RoutingPaths } from './app.routes';

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
