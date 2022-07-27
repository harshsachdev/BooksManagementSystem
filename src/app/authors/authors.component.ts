import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from '../shared/book.service';
import { iAuthor } from '../shared/iModels';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  constructor(private bookService:BookService, private _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) { }
  
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('newAuthor') newAuthorTextBox:ElementRef;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  authors:iAuthor[] = [];
  
  ngOnInit(): void {
    //this.getAllAuthors();
    this.authors = this.activatedRoute.snapshot.data['data'];
  }

  getAllAuthors(){
    this.bookService.getAllAuthors().pipe(take(1)).subscribe(
      (res) => {
        this.authors = res;
      }
    )
  }

  Clicked(event:any, val:any, authorId:string=''){
    // console.log(event);
    // console.log(val);
    this.updateAuthor(val?.value, authorId);
  }

  addAuthor(name:string){
    let obj:iAuthor = {} as iAuthor;
    obj.name = name;
    this.bookService.createAuthor(obj).pipe(take(1)).subscribe(
      (rs) => {
        this.authors.push(rs);
        this.newAuthorTextBox.nativeElement.value='';
        this.openSnackBar('Data Saved Successfully');
      }
    )
  }

  updateAuthor(name:string, id:string){
    let obj:iAuthor = {} as iAuthor;
    obj.name = name;
    this.bookService.updateAuthor(obj, id).pipe(take(1)).subscribe(
      (rs) => {
        this.getAllAuthors();
        console.log(this.authors);
        this.openSnackBar('Data Updated Successfully');
      }
    )
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
