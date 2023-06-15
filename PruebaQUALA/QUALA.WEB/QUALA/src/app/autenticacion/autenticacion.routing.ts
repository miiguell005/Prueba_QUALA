import { Routes } from '@angular/router';

import { AuthGuard } from '../_services/auth.guard';
import { LoginComponent } from './login/login.component';



export const AutenticacionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent, 
      }
      
    ]
  }
];
