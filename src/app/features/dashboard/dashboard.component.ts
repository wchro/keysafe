import { Component } from '@angular/core';
import { IconsComponent } from '../../shared/icons/icons.component';
import { PasswordService } from '../../core/services/password/password.service';
import { AtobPipe } from '../../core/pipes/atob.pipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { decryptData, hexToArray } from '../../utils/encryption';

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
      next: (response: any) => {
        this.data = response;
        const masterKey = hexToArray(
          atob(localStorage.getItem('encryptionKey')?.split('|')[1] ?? '')
        );
        response?.items.map(async (item: any) => {
          item.name = await decryptData(masterKey, item.name);
          item.account = await decryptData(masterKey, item.account);
          item.password = await decryptData(masterKey, item.password);
          item.site = await decryptData(masterKey, item.site);
        });
      },
      error: (error) => (this.data = error.error),
    });
  }

  copyToClipboard(text: string) {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('ERROR COPYING PASSWORD');
    }
  }
}
