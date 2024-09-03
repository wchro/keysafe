import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthLoginComponent } from '../../features/login/login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AuthLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginPageComponent {}
