import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ListComponent } from './list/list.component';
import { SucursalesRoutes } from './sucursales.routing';
import { MyButtonComponent } from '../component/my-button/my-button.component';
import { MyTitleComponent } from '../component/my-title/my-title.component';
import { MyTableComponent } from '../component/my-table/my-table.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SucursalesRoutes),
    NgbModule,
    FormsModule,   
     
  ],
  exports: [],
  declarations: [
    ListComponent,
    MyButtonComponent,
    MyTitleComponent,
    MyTableComponent,
    EditarComponent
  ]
})
export class SucursalesModule {}