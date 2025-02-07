import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { argon2id } from 'hash-wasm';
import { hexToArray } from '../../../utils/encryption';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(username: string, password: string) {
    const body = { username, password };
    return this.api.post('/auth/login', body);
  }

  prelogin(username: string) {
    const body = { username };
    return this.api.post('/auth/prelogin', body);
  }

  register(
    username: string,
    email: string,
    password: string,
    salt: string,
    masterKey: string
  ) {
    const body = { username, email, password, salt, masterKey };
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

  generateSalt() {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    return salt;
  }

  // TODO: Revisar tipado de output
  async generateHash(
    password: string,
    salt: Uint8Array,
    output: 'hex' | 'binary' | 'encoded' = 'encoded'
  ): Promise<any> {
    const hash = await argon2id({
      password: password,
      salt,
      parallelism: 1,
      iterations: 256,
      memorySize: 512,
      hashLength: 32,
      outputType: output,
    });

    return hash;
  }

  async generateCryptoKey(key: Uint8Array): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
      'raw',
      key,
      {
        name: 'AES-GCM',
        length: 256,
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  generateMasterKey(): Uint8Array {
    const masterKey = new Uint8Array(32);
    crypto.getRandomValues(masterKey);
    return masterKey;
  }

  async encryptMasterKey(derivedKey: Uint8Array, masterKey: Uint8Array) {
    const key = await this.generateCryptoKey(derivedKey);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      masterKey
    );

    return `${this.generateHex(iv)}$${this.generateHex(
      new Uint8Array(encryptedBuffer)
    )}`;
  }

  async decryptMasterKey(derivedKey: Uint8Array, masterKey: string) {
    const iv = hexToArray(masterKey.split('$')[0]);
    const data = hexToArray(masterKey.split('$')[1]);

    const key = await this.generateCryptoKey(derivedKey);

    const desencryptedKey = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return new Uint8Array(desencryptedKey);
  }

  generateHex(arr: Uint8Array) {
    return Array.from(arr)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
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
