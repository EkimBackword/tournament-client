import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-me-dialog',
  templateUrl: './add-me-dialog.component.html',
  styleUrls: ['./add-me-dialog.component.less']
})
export class AddMeDialogComponent implements OnInit {

  DECK_CLASSES = [
    { id: 'Druid', title: 'Друид', select: false, extra: false },
    { id: 'Mage', title: 'Маг', select: false, extra: false },
    { id: 'Paladin', title: 'Паладин', select: false, extra: false },
    { id: 'Priest', title: 'Жрец', select: false, extra: false },
    { id: 'Rogue', title: 'Разбойник', select: false, extra: false },
    { id: 'Shaman', title: 'Шаман', select: false, extra: false },
    { id: 'Warlock', title: 'Чернокнижник', select: false, extra: false },
    { id: 'Warrior', title: 'Воин', select: false, extra: false },
    { id: 'Hunter', title: 'Охотник', select: false, extra: false },
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
  get selectedCount() {
    return this.DECK_CLASSES.filter(c => c.select).length;
  }
  

  closeDialog() {
    if (this.isCorrect) {
      this.dialogRef.close(this.DECK_CLASSES.filter(c => c.select).sort((a, b) => a.extra ? 1 : 0).map(c => c.id));
    }
  }

  selectDeck(deck) {
    if (deck.select) {
      deck.extra = false;
    }

    deck.select = !deck.select;

    if (this.DECK_CLASSES.filter(c => c.select).length === this.data.DeckCount && this.data.DeckCount === 4) {
      deck.extra = true;
    }
  }

}
