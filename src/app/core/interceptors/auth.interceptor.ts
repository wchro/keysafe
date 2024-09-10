import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const ignoreUrls =
    !req.url.includes('api') ||
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register');
  if (ignoreUrls) return next(req);

  const token = localStorage.getItem(
    req.url.includes('refresh-token') ? 'refreshToken' : 'accessToken'
  );

  const cloneReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(cloneReq);
};
