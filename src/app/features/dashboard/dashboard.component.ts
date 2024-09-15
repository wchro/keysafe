import { Component } from '@angular/core';
import { IconsComponent } from '../../shared/icons/icons.component';
import { PasswordService } from '../../core/services/password/password.service';
import { AtobPipe } from '../../core/pipes/atob.pipe';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [IconsComponent, AtobPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  data: any;

  constructor(public password: PasswordService) {}

  ngOnInit() {
    this.password.getPasswords().subscribe({
      next: (response) => (this.data = response),
      error: (error) => (this.data = error.error),
    });
  }

  copyToClipboard(text: string) {
    try {
      navigator.clipboard.writeText(atob(text));
    } catch (error) {
      console.error('ERROR COPYING PASSWORD');
    }
  }
}
