import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { GeneratorComponent } from '../../features/generator/generator.component';
import { PasswordService } from '../../core/services/password/password.service';

@Component({
  selector: 'page-generator',
  standalone: true,
  imports: [MenuComponent, GeneratorComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorPageComponent {}
