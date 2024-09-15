import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api/api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PasswordService } from '../../core/services/password/password.service';
import { Router } from '@angular/router';

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

  onSubmit() {
    this.isLoading = true;
    if (this.addForm.valid) {
      const { name, account, password, site } = this.addForm.value;
      if (name && account && password && site) {
        this.passwordService
          .addPassword(name, account, password, site)
          .subscribe({
            next: (response) => this.router.navigateByUrl('/dashboard'),
            error: (error) => (this.isLoading = false),
          });
      }
    }
  }
}
