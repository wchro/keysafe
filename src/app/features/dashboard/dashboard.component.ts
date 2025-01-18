import { Component } from '@angular/core';
import { IconsComponent } from '../../shared/icons/icons.component';
import { PasswordService } from '../../core/services/password/password.service';
import { AtobPipe } from '../../core/pipes/atob.pipe';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [IconsComponent, AtobPipe, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  data: any = undefined;

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
