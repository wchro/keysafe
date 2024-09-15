import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import PasswordGenerator from '@smakss/password-generator';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private api: ApiService) {}

  addPassword(name: string, account: string, password: string, site: string) {
    const body = { name, account, password, site };
    return this.api.post('/passwords', body);
  }

  getPasswords() {
    return this.api.get('/passwords');
  }

  generatePassword(): string | string[] {
    return PasswordGenerator({
      length: 12,
      numberOfPasswords: 1,
    });
  }
}
