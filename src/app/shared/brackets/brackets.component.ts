import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
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
  @Input() set data(value) {
    if (value !== void 0 && value !== null) {
      this.initData = value;
    }
  }
  get data() {
    return this.initData;
  }

  @Output() public OnChange = new EventEmitter<any>();

  protected viewOptions = {
    // размеры
    teamWidth: 150,
    scoreWidth: 35,
    matchMargin: 20,
    roundMargin: 20,
    // отрисовка
    centerConnectors: true,
    disableHighlight: false,
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

  constructor() { }

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
  protected getGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  protected _loadBracket() {
    console.log(this.parameters);
    $(`#minimal--${this.guid} .demo`).empty();
    this.bracket = $(`#minimal--${this.guid} .demo`).bracket(this.parameters);
  }

  protected _onChange(data) {
    console.log(data);
    this.initData = data;
    this.OnChange.next(data);
  }
}

// http://www.aropupu.fi/bracket
// https://github.com/teijo/jquery-bracket/blob/master/src/jquery.bracket.ts
