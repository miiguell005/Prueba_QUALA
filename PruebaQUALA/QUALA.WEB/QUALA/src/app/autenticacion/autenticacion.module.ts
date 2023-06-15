import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AutenticacionRoutes } from './autenticacion.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AutenticacionRoutes),
    NgbModule,
    FormsModule
  ],
  exports: [RouterModule],
  declarations: [
    LoginComponent,
  ]
})
export class autenticacionModule {}