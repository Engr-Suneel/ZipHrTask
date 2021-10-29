import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoading } from '../shared/store/selectors/loader.selectors';
import { AppState } from '../store';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.select(getLoading).subscribe((loading) => {
      setTimeout(() => {
        this.isLoading = loading
      }, 0);
    });
  }

  ngOnInit(): void {
  }

}
