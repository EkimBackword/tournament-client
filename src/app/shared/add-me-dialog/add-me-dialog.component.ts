import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-me-dialog',
  templateUrl: './add-me-dialog.component.html',
  styleUrls: ['./add-me-dialog.component.less']
})
export class AddMeDialogComponent implements OnInit {

  DECK_CLASSES = [
    { id: 'Druid', title: 'Друид', select: false },
    { id: 'Mage', title: 'Маг', select: false },
    { id: 'Paladin', title: 'Паладин', select: false },
    { id: 'Priest', title: 'Жрец', select: false },
    { id: 'Rogue', title: 'Разбойник', select: false },
    { id: 'Shaman', title: 'Шаман', select: false },
    { id: 'Warlock', title: 'Чернокнижник', select: false },
    { id: 'Warrior', title: 'Воин', select: false },
    { id: 'Hunter', title: 'Охотник', select: false },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMeDialogComponent>
  ) { }

  ngOnInit() {
  }

  get isCorrect() {
    return this.DECK_CLASSES.filter(c => c.select).length === this.data.DeckCount;
  }

  closeDialog() {
    if (this.isCorrect) {
      this.dialogRef.close(this.DECK_CLASSES.filter(c => c.select).map(c => c.id));
    }
  }

}
