import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingPaths } from './app.routes';
import { AuthGuard } from './core/auth/guards/auth-guards';

const routes: Routes = [
  {
    path: RoutingPaths.loginPath,
    loadChildren: () =>
      import('./public-feature/signup/signup.module').then(
        (m) => m.SignupModule
      ),
  },
  {
    path: RoutingPaths.learningLogPath,
    loadChildren: () =>
      import('./learning-log/leaning-log.module').then(
        (m) => m.LearningLogModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
