import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.less']
})
export class DeckListComponent implements OnInit {

  public _deckList: string[];
  @Input() set deckList(value: string) {
    if (value !== void 0 && value !== null) {
      this._deckList = value.split(', ');
    }
  }
  get deckList() {
    return this._deckList.join(', ');
  }

  constructor() { }

  ngOnInit() {
  }

}
