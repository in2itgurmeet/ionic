import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpContextToken,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../Service/loader.service';

export const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);
export const NO_LOADER = new HttpContextToken<boolean>(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isPublic = req.context.get(IS_PUBLIC_API);
    const skipLoader = req.context.get(NO_LOADER);

    const token = localStorage.getItem('token');

    let authReq = req;

    if (!skipLoader) {
      this.loaderService.showLoader();
    }

    const isThirdPartyAPI = req.url.includes('photon.komoot.io') || req.url.includes('router.project-osrm.org') || req.url.includes('routing.openstreetmap.de') || req.url.includes('nominatim.openstreetmap.org');

    if (!isPublic && token && !isThirdPartyAPI) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const newAuthToken = event.headers.get('x-refresh-token');
          if (newAuthToken) {
            localStorage.setItem('token', newAuthToken);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/auth']);
        }

        return throwError(() => error);
      }),

      finalize(() => {
        if (!skipLoader) {
          this.loaderService.hideLoader();
        }
      })
    );
  }
}
