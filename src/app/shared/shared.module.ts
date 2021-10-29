import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTitleComponent } from './ui-title/ui-title.component';
import { AzPaginationComponent } from './az-pagination/az-pagination.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UiTitleComponent,
    LoaderComponent,
    AzPaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UiTitleComponent,
    LoaderComponent,
    AzPaginationComponent,
  ]
})
export class SharedModule { }
