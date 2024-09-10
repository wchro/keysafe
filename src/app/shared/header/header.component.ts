import { Input, Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogged: boolean = false;
  @Input() showNav: boolean = true;
  constructor(authService: AuthService) {
    this.isLogged = authService.isLogged();
  }
}
