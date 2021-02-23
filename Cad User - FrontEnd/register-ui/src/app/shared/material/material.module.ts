import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  exports:[
    MatListModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
