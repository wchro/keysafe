import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';

export const authGuard: CanActivateFn = () => {
  if (typeof window !== 'undefined') {
    const router = inject(Router);
    const api = inject(ApiService);
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
    // let newAccessToken;
    if (isAccessExpired) {
      api.post('/auth/refresh-token', {}).subscribe({
        next: (response) => {
          localStorage.setItem('accessToken', response.token);
          return true;
        },
        error: (error) => {
          localStorage.clear();
          router.navigateByUrl('/login');
        },
      });
    }

    return true;
  }

  return false;
};
