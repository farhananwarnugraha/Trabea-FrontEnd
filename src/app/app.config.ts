import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { JwtService } from './Auth/jwt.service';
import { AuthService } from './Auth/auth.service';
import { EMPTY } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './Auth/jwt.interceptor';
import { url } from 'inspector';

export function initAuth(){
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  return () => (jwtService.getToken() ? authService.getCurrentUser : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      multi: true
    }
  ]
};

export const environtment = {
  urlapi: 'http://localhost:5121/api/',
}
