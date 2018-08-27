import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultSnackBarComponent } from './default-snack-bar/default-snack-bar.component';
import { BracketsComponent } from './brackets/brackets.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { SignUpDialogComponent } from './sign-up-dialog/sign-up-dialog.component';
import { AddMeDialogComponent } from './add-me-dialog/add-me-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DefaultSnackBarComponent,
    BracketsComponent,
    DeckListComponent,
    SignUpDialogComponent,
    AddMeDialogComponent
  ],
  entryComponents: [
    DefaultSnackBarComponent,
    SignUpDialogComponent,
    AddMeDialogComponent
  ],
  exports: [
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    BracketsComponent,
    DeckListComponent,
    SignUpDialogComponent,
    AddMeDialogComponent
  ]
})
export class SharedModule { }
