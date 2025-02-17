import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/guards/auth-guard';
import { LoginGuard } from './services/guards/login-guard';

export const routes: Routes = [
    {path:'',pathMatch:'full', redirectTo:'home'},
    {path:'home', component:HomeComponent, canActivate:[LoginGuard]},
    {path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),canActivate: [AuthGuard]},
    {path: 'sensors', loadComponent: () => import('./pages/sensors/sensors.component').then(m => m.SensorsComponent), canActivate:[AuthGuard]}
];
