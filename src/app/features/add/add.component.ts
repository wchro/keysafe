import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api/api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PasswordService } from '../../core/services/password/password.service';
import { Router } from '@angular/router';
import { encryptData, hexToArray } from '../../utils/encryption';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  isLoading: boolean = false;

  constructor(
    private api: ApiService,
    private passwordService: PasswordService,
    private router: Router
  ) {}

  addForm = new FormGroup({
    name: new FormControl(),
    account: new FormControl(),
    password: new FormControl(),
    site: new FormControl(),
  });

  async onSubmit() {
    this.isLoading = true;
    if (this.addForm.valid) {
      const { name, account, password, site } = this.addForm.value;
      if (name && account && password && site) {
        const derivedKey = hexToArray(
          atob(localStorage.getItem('encryptionKey')?.split('|')[1] ?? '')
        );
        const encryptedName = await encryptData(derivedKey, name);
        const encryptedAccount = await encryptData(derivedKey, account);
        const encryptedPassword = await encryptData(derivedKey, password);
        const encryptedSite = await encryptData(derivedKey, site);
        this.passwordService
          .addPassword(
            encryptedName,
            encryptedAccount,
            encryptedPassword,
            encryptedSite
          )
          .subscribe({
            next: (response) => this.router.navigateByUrl('/dashboard'),
            error: (error) => (this.isLoading = false),
          });
      }
    }
  }
}
