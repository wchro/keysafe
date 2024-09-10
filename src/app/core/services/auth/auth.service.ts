import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(username: string, password: string) {
    const body = { username, password };
    return this.api.post('/auth/login', body);
  }

  register(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.api.post('/auth/register', body);
  }

  isTokenExpired(token: string): boolean {
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      return currentTime >= exp ? true : false;
    } catch {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isLogged(): boolean {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('refreshToken')) return false;
      return true;
    }
    return false;
  }
}
