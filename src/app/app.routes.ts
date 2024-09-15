import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { GeneratorPageComponent } from './pages/generator/generator.component';
import { AddPageComponent } from './pages/add/add.component';

export const routes: Routes = [
  // Home
  { path: '', component: HomePageComponent },
  // Auth
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  //Dasboard
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'generator',
    component: GeneratorPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add',
    component: AddPageComponent,
    canActivate: [authGuard],
  },
  // 404
  { path: '**', redirectTo: '' },
];
