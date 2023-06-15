import { Routes } from '@angular/router';

import { AuthGuard } from '../_services/auth.guard';
import { ListComponent } from './list/list.component';
import { EditarComponent } from './editar/editar.component';



export const SucursalesRoutes: Routes = [
  {
    path: '',
    children: [
      {
				path: 'lista',
				component: ListComponent,
				data: {					
					title: 'Home',				
				},
				canActivate: [AuthGuard]
			},
      {
				path: 'editar/:id',
				component: EditarComponent,
				data: {
					title: 'Edit sucursal',
				},
				canActivate: [AuthGuard]
			},
      
    ]
  }
];
