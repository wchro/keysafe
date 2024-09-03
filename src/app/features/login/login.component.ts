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
        this.auth.login(username, password).subscribe({
          next: (response) => {
            this.data = response;
            // Set data to the localStorage
            localStorage.setItem('user', response.user);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.router.navigateByUrl('/dashboard');
          },
          error: (error) => {
            this.data = error.error;
            this.isLoading = false;
          },
        });
    }
  }
}
