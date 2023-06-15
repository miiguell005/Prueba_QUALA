import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_services/auth.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: 'sucursales',
            loadChildren: () => import('./sucursales/sucursales.module').then(m => m.SucursalesModule)
        },
    ]
  },
  {
      path: '',
      component: BlankComponent,
      children: [
          {
              path: 'authentication',
              loadChildren:
                  () => import('./autenticacion/autenticacion.module').then(m => m.autenticacionModule)
          }
      ]
  },
  {
      path: '**',
    redirectTo: 'authentication/login'
  }
];

