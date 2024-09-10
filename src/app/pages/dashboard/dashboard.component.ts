import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { DashboardComponent } from '../../features/dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, DashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardPageComponent {}
