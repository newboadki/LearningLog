import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UnauthenticableUrls } from './unauthenticable-urls';

@Injectable()
export class AuthTokenHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private excludedUrls: UnauthenticableUrls
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Early exit
    if (!this.needsAuthentication(req.url)) {
      return next.handle(req);
    }

    // Add token to the request
    req = this.requestWithToken(this.authService.getAuthToken(), req);

    // Continue
    return next.handle(req);
  }

  private needsAuthentication(url: string): boolean {
    return !this.excludedUrls.urls.includes(url);
  }

  private requestWithToken(
    token: string | null,
    originalRequest: HttpRequest<any>
  ): HttpRequest<any> {
    if (token != null) {
      const req = originalRequest.clone({
        setHeaders: { Authorization: `${token}` },
      });
      return req;
    } else {
      return originalRequest;
    }
  }
}
