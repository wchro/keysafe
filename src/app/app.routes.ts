import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

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
  // 404
  { path: '**', redirectTo: '' },
];
