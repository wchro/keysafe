import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private api: ApiService) {}

  getPasswords() {
    return this.api.get('/passwords');
  }

  generatePassword() {}
}
