import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningLogComponent } from './components/learning-log.component';
import { LearningLogRoutingModule } from './leaning-log-routing.module';

@NgModule({
  declarations: [LearningLogComponent],
  imports: [CommonModule, LearningLogRoutingModule],
  exports: [LearningLogComponent],
})
export class LearningLogModule {}
