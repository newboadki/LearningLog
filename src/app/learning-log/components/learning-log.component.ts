import { Component, OnInit } from '@angular/core';
import { LearningLogService } from '../services/learning-log-service';

@Component({
  selector: 'app-learning-log',
  templateUrl: './learning-log.component.html',
  styleUrls: ['./learning-log.component.sass'],
})
export class LearningLogComponent implements OnInit {
  constructor(private learningLogService: LearningLogService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.learningLogService.fetchLogs();
  }
}
