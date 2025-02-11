import { FormPasComponent } from './components/form-pas/form-pas.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
    {path:'',pathMatch:'full', redirectTo:'home'},
    {path:'home', component:HomeComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'form',component:FormPasComponent}
];
