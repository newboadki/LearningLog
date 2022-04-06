/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenHttpInterceptor } from './auth-token-http-interceptor';

/** Http interceptor providers in outside-in order */
export const authModuleHttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenHttpInterceptor,
    multi: true,
  },
];
