import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from './form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SingleSelectionComponent } from '../../components/single-selection/single-selection.component';

@NgModule({
  declarations: [
    FormComponent,
    SingleSelectionComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class FormModule { }
