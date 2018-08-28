import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Input() public BannedDeck: string;
  @Output() public OnSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  deckName(id: string) {
    const list = {
      'Druid': 'Друид',
      'Mage': 'Маг',
      'Paladin': 'Паладин',
      'Priest': 'Жрец',
      'Rogue': 'Разбойник',
      'Shaman': 'Шаман',
      'Warlock': 'Чернокнижник',
      'Warrior': 'Воин',
      'Hunter': 'Охотник',
    };
    return list[id];
  }

  select(deck) {
    this.OnSelect.next(deck);
  }

}
