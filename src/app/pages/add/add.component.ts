import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AddComponent } from '../../features/add/add.component';

@Component({
  selector: 'page-add',
  standalone: true,
  imports: [MenuComponent, AddComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddPageComponent {}
