import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultSnackBarComponent } from './default-snack-bar/default-snack-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DefaultSnackBarComponent
  ],
  entryComponents: [
    DefaultSnackBarComponent
  ],
  exports: [
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
