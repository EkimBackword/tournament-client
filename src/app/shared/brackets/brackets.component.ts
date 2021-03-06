import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, NgZone } from '@angular/core';
// import * as $ from 'jquery';
// import 'jquery-bracket';
declare var $: any;

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.less']
})
export class BracketsComponent implements OnInit, AfterViewInit {
  parameters: any;
  bracket: any;
  guid: string;

  initData = {
    teams : [ [null, null], [null, null] ],
    results : [[ [], [] ]]
  };

  @Input() canEdit: boolean;
  @Input() typeBracket: 'group' | 'single' | 'double';
  @Input() groupName?: string;
  @Input() autocompleteData: string[] = [];
  @Input() set data(value) {
    if (value !== void 0 && value !== null) {
      this.initData = value;
    }
  }
  get data() {
    return this.initData;
  }

  @Output() public OnChange = new EventEmitter<any>();
  @Output() public OnSendOpponentInfo = new EventEmitter<any[]>();

  protected viewOptions = {
    // размеры
    teamWidth: 250,
    scoreWidth: 35,
    matchMargin: 20,
    roundMargin: 20,
    // отрисовка
    centerConnectors: true,
    disableHighlight: false,
    decorator: {
      edit: (container, data, doneCb) => this.autocompleteEditFn(container, data, doneCb),
      render: (container, data, score, state) => this.autocompleteRenderFn(container, data, score, state)
    }
  };

  protected skipOptionsEnable = {
    skipSecondaryFinal: true, // without SecondaryFinal only for double elumination
    skipGrandFinalComeback: false, // without GrandFinal
    skipConsolationRound: true
  };

  protected editableOptions = {
    save: (data) => this._onChange(data),
    userData: '',
    disableToolbar: false,
    disableTeamEdit: false
  };

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.guid = this.getGuid();
    this.parameters = Object.assign({}, this.viewOptions);
    if (this.canEdit) {
      this.parameters = Object.assign({}, this.parameters, this.editableOptions );
    }
    switch (this.typeBracket) {
      case 'single': {
        this.parameters = Object.assign({}, this.parameters, {
          init: this.initData,
          skipConsolationRound: true
        });
        break;
      }
      case 'group': {
        this.parameters = Object.assign({}, this.parameters, {
          init: this.initData,
          skipSecondaryFinal: true,
          skipGrandFinalComeback: false,
          skipConsolationRound: true
        });
        break;
      }
      case 'double': {
        this.parameters = Object.assign({}, this.parameters, {
          init: this.initData,
          skipSecondaryFinal: true, // without SecondaryFinal only for double elumination
          skipGrandFinalComeback: false, // without GrandFinal
          skipConsolationRound: true
        });
        break;
      }
    }
  }

  ngAfterViewInit() {
    this._loadBracket();
  }

  autocompleteEditFn(container, data, doneCb) {
    const input = $('<input type="text">');
    input.val(data);
    input.autocomplete({ source: this.autocompleteData });
    input.blur(function() { doneCb(input.val()); });
    input.keyup(function(e) { if ( (e.keyCode || e.which ) === 13) { input.blur(); } });
    container.html(input);
    input.focus();
  }

  autocompleteRenderFn(container, data, score, state) {
    switch (state) {
      case 'empty-bye':
        container.append('BYE');
        return;
      case 'empty-tbd':
        container.append('TBD');
        return;
      case 'entry-no-score':
      case 'entry-default-win':
      case 'entry-complete':
        const fields = data.split(':'); // 'EkimBackward#2744:1:Druid, Hunter, Mage, Warrior'
        if (fields.length === 3) {
          const deckList = fields[2].split(', ').reduce((prev, deck: string) => {
            return prev + ' <img width="21px" style="margin: -6px 0;" src="assets/img/classes/' + deck.toLowerCase() + '.png"> ';
          }, '');
          container.append(deckList).append( `<span class="battleTag" user-id="${fields[1]}">${fields[0]}</span>` );
        } else if (fields.length === 1) {
          container.append( `<span class="battleTag" user-id="null">${fields[0]}</span>` );
        } else {
          container.append('<i>INVALID</i>');
        }
        return;
    }
  }

  protected getGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  protected _loadBracket() {
    try {
      $(`#minimal--${this.guid} .demo`).empty();
      this.bracket = $(`#minimal--${this.guid} .demo`).bracket(this.parameters);
      if (this.canEdit) {
        $.contextMenu({
          selector: '.teamContainer',
          callback: (key, options) => {
            if (key === 'telegram') {
              const match = (options.$trigger[0] as HTMLElement).parentNode;
              const round = match.parentNode;
              const bracket =  round.parentNode;

              const matchIndex = this.findIndex(round.childNodes, match);
              const roundIndex = this.findIndex(bracket.childNodes, round);
              const bracketIndex = (bracket as HTMLElement).classList.contains('bracket') ? 0 :
                                   (bracket as HTMLElement).classList.contains('finals') ? 2 : 1;

              const players: any = $( options.$trigger[0] ).find( '.battleTag' );
              const player1Id: any = players.get(0).attributes['user-id'].value;
              const player2Id: any = players.get(1).attributes['user-id'].value;
              let result = [player1Id, player2Id].map(id => id === 'null' ? null : id);
              result = result.concat([bracketIndex, roundIndex, matchIndex]);
              this.zone.run(() => {
                this.OnSendOpponentInfo.next(result);
              });
            }
          },
          items: {
            'telegram': {name: 'Сообщить'},
            'sep1': '---------',
            'quit': {name: 'Quit'}
          }
        });
      }
    } catch (e) {
      console.warn(e);
    }
  }

  protected findIndex(list: NodeListOf<Node>, elem: any): number {
    for (let index = 0; index < list.length; index++) {
      if (elem === list.item(index)) {
        return index;
      }
    }
    return -1;
  }

  protected _onChange(data) {
    // console.log(data);
    this.initData = data;
    this.OnChange.next(data);
  }
}

// http://www.aropupu.fi/bracket
// https://github.com/teijo/jquery-bracket/blob/master/src/jquery.bracket.ts
