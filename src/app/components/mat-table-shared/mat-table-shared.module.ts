import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableSharedComponent } from './mat-table-shared/mat-table-shared.component';



@NgModule({
  declarations: [
    MatTableSharedComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatTableSharedComponent
  ]
})
export class MatTableSharedModule { }
