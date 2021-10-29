import { Component, Input, OnInit } from '@angular/core';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';

@Component({
  selector: 'app-ui-title',
  templateUrl: './ui-title.component.html',
  styleUrls: ['./ui-title.component.css']
})
export class UiTitleComponent implements OnInit {

  @Input() breadcrumbItems: IUiTitle[] = [];
  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
