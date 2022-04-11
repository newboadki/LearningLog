import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutingPaths } from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class LearningLogService {
  constructor(private httpClient: HttpClient) {}

  fetchLogs(): void {
    this.httpClient
      .get('http://localhost:3000/' + RoutingPaths.learningLogPath)
      .subscribe(() => {});
  }
}
