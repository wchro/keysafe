import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const ignoreUrls = !req.url.includes('/api/') || req.url.includes('/auth/');
  if (ignoreUrls) return next(req);

  console.log('URL INTERCEPTADA', req.url);

  const token = localStorage.getItem('accessToken');
  const cloneReq = req.clone({ setHeaders: { Authorization: `Bearer` } });
  return next(cloneReq);
};
