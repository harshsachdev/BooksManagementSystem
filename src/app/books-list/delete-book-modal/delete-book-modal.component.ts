import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-book-modal',
  templateUrl: './delete-book-modal.component.html',
  styleUrls: ['./delete-book-modal.component.scss']
})
export class DeleteBookModalComponent{

  constructor(public dialogRef: MatDialogRef<DeleteBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
