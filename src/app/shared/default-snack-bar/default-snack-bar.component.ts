import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-default-snack-bar',
  templateUrl: './default-snack-bar.component.html',
  styleUrls: ['./default-snack-bar.component.less']
})
export class DefaultSnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
