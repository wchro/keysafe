import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardPageComponent {}
