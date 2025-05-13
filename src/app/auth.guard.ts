// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_app_token');
  const currentUrl = router.url;

  return new Observable(observer => {
    if (token) {
      observer.next(true);
    } else {
      if (!currentUrl.includes('/auth') && !currentUrl.includes('/login')) {
        observer.next(router.createUrlTree(['/auth/login']));
      } else {
        observer.next(true); // Allow login page access
      }
    }
    observer.complete();
  });
};



export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_app_token');

  if (token) {
    router.navigate(['/pages']); // Redirect to main page if already logged in
    return false;
  }

  return true;
};

