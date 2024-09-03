import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthRegisterComponent } from '../../features/register/register.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, AuthRegisterComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterPageComponent {}
