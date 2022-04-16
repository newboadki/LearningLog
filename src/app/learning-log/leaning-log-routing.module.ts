import { RouterModule, Routes } from '@angular/router';
import { LearningLogComponent } from './components/learning-log.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LearningLogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningLogRoutingModule {}
