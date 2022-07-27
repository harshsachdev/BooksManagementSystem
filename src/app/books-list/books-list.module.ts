import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListRoutingModule } from './books-list-routing.module';
import { BooksListComponent } from './books-list.component';
import { NewBookModalComponent } from './new-book-modal/new-book-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialExampleModule } from '../shared/material-module/material.module';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';
import { DeleteBookModalComponent } from './delete-book-modal/delete-book-modal.component';

@NgModule({
  declarations: [
    BooksListComponent,
    NewBookModalComponent,
    EditBookModalComponent,
    DeleteBookModalComponent
  ],
  imports: [
    CommonModule,
    BooksListRoutingModule,
    ReactiveFormsModule,
    ModalModule.forChild(),
    BsDatepickerModule.forRoot(),
    MaterialExampleModule
  ]
})
export class BooksListModule { }
