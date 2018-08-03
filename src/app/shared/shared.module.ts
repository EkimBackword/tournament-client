import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultSnackBarComponent } from './default-snack-bar/default-snack-bar.component';
import { BracketsComponent } from './brackets/brackets.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DefaultSnackBarComponent,
    BracketsComponent
  ],
  entryComponents: [
    DefaultSnackBarComponent
  ],
  exports: [
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    BracketsComponent
  ]
})
export class SharedModule { }
