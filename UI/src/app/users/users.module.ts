import { MaterialModule } from './../shared/material/material.module';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersComponent,
    FormComponent
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class UsersModule { }
