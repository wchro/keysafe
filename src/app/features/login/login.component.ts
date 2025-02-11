import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, NotificationsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class AuthLoginComponent {
  isLoading: boolean = false;
  data: any;

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor(private auth: AuthService, private router: Router) {}

  submitForm(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username && password)
        // call api to get the salt for the user
        this.auth.prelogin(username).subscribe({
          next: (response) => {
            const salt = new Uint8Array(
              response.salt
                .match(/.{1,2}/g)
                .map((byte: any) => parseInt(byte, 16))
            );
            // generate hash
            this.auth.generateHash(password, salt, 'encoded').then((hash) => {
              // call login api
              this.auth.login(username, hash).subscribe({
                next: async (response) => {
                  // get derived key
                  const derivedKey = await this.auth.generateHash(
                    password,
                    salt,
                    'binary'
                  );

                  this.data = response;
                  // Set data to the localStorage
                  localStorage.setItem('user', response.user);
                  localStorage.setItem('accessToken', response.accessToken);
                  localStorage.setItem('refreshToken', response.refreshToken);

                  // Set encryption keys
                  const masterKeyB64 = btoa(response.masterKey);
                  const derivedKeyB64 = btoa(this.auth.generateHex(derivedKey));
                  const encryptionKey = `${masterKeyB64}|${derivedKeyB64}`;
                  localStorage.setItem('encryptionKey', encryptionKey);

                  // redirect
                  this.router.navigateByUrl('/dashboard');
                },
                error: (error) => {
                  this.data = error.error;
                  this.isLoading = false;
                },
              });
            });
          },
          error: (error) => {
            this.data = error.error;
            this.isLoading = false;
          },
        });
    }
  }
}
