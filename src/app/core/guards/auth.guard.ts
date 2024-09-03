import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  if (!refreshToken || !accessToken) {
    router.navigateByUrl('/login');
    return false;
  }

  // Check if token expired
  const isRefreshExpired = authService.isTokenExpired(refreshToken);
  const isAccessExpired = authService.isTokenExpired(accessToken);

  if (isRefreshExpired && isAccessExpired) {
    authService.logout();
    router.navigateByUrl('/login');
    return false;
  }

  // TODO: Get new token

  return true;
};
