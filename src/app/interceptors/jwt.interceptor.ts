import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    let headers = request.headers.set('Content-Type', 'application/json');
    if (this.authService.authtoken && isApiUrl) {
      headers = headers.set('Authorization', `Bearer ${this.authService.authtoken}`);
    }
    request = request.clone({
      headers: headers
    });
    return next.handle(request);
  }
}
