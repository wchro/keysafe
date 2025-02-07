import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { Router } from '@angular/router';

interface RegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, NotificationsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class AuthRegisterComponent {
  isLoading: boolean = false;
  data: any;

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor(private auth: AuthService, private router: Router) {}

  async submitForm(): Promise<void> {
    this.isLoading = true;
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      if (username && email && password) {
        const salt = this.auth.generateSalt();
        const hash = await this.auth.generateHash(password, salt, 'encoded');
        const derivedKey = await this.auth.generateHash(
          password,
          salt,
          'binary'
        );
        const hexSalt = this.auth.generateHex(salt);

        // create master key
        const masterKey = this.auth.generateMasterKey();
        const encryptedKey = await this.auth.encryptMasterKey(
          derivedKey,
          masterKey
        );

        this.auth
          .register(username, email, hash, hexSalt, encryptedKey)
          .subscribe({
            next: (response) => {
              this.data = response;
              localStorage.setItem('user', response.user);
              localStorage.setItem('accessToken', response.accessToken);
              localStorage.setItem('refreshToken', response.refreshToken);
              setTimeout(() => this.router.navigateByUrl('/dashboard'), 2000);
            },
            error: (error) => {
              this.data = error.error;
              this.isLoading = false;
            },
          });
      }
    }
  }
}
