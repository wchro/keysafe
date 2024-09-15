import { Component } from '@angular/core';
import { PasswordService } from '../../core/services/password/password.service';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  password: string | string[] = '';
  constructor(private passwordService: PasswordService) {
    this.generatePassword();
  }

  NgOnInit() {}

  generatePassword(): void {
    this.password = this.passwordService.generatePassword();
  }
}
