import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shared/book.service';
import { iAuthor, iBook } from 'src/app/shared/iModels';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss']
})
export class EditBookModalComponent implements OnInit, OnDestroy {

  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  book_id:number|string;
  book_obj:iBook = {} as iBook;
  refresh_table:any;
  showSnackBar:any;
 
  constructor(public bsModalRef: BsModalRef, private bookService:BookService) {}
 
  is_loading_text = 'Please wait...';
  is_loading = false;
  max_date = new Date();
  authors:iAuthor[] = [];
  private createBookSubscription: Subscription;
  getAuthorSubscription:Subscription;
  getBookSubscription: Subscription;
  addBookForm: FormGroup;

  isFormLoaderDisplay = true;

  // confirmResolve?: () => void;
  // confirmReject?: () => void;
  // confirmPromise?: Promise<void>;

  ngOnInit(): void {
    // this.initForm();
    
    // this.confirmPromise = new Promise((resolve, reject) => {
    //   this.confirmResolve = resolve;
    //   this.confirmReject = reject;
    // });

    this.getAuthorSubscription = this.bookService.authorsList.subscribe( (data) => {this.authors = data},
    (error) => {console.log(error)});
    this.getBookSubscription = this.bookService.getBook(this.book_id).subscribe(
      (data)=>{
        this.book_obj = data;
        this.initForm(this.book_obj)
        this.isFormLoaderDisplay = false;
      },
      (err)=>{console.log(err)})
  }

  initForm(book_obj:iBook){
    this.addBookForm = new FormGroup({
      'book_title': new FormControl(book_obj.book_title, Validators.required),
      'book_price': new FormControl(book_obj.book_price, Validators.required),
      'author': new FormControl(book_obj.author, Validators.required),
      'published_year': new FormControl(new Date(book_obj.published_year), Validators.required),
      'description': new FormControl(book_obj.description, Validators.required)
    });
  }

  onSubmit(){
    this.is_loading = true;
    let book_title = this.addBookForm.value.book_title;
    let book_price = this.addBookForm.value.book_price;
    let author = this.addBookForm.value.author;
    let published_year = this.formatDate(this.addBookForm.value.published_year);
    let description = this.addBookForm.value.description;
    
    this.book_obj = {'book_title':book_title,'book_price':book_price, 'author':author, 'published_year':published_year,'description':description};

    this.createBookSubscription = this.bookService.updateBook(this.book_obj, this.book_id).subscribe(
      (r) => {
        this.is_loading = false;
        this.bsModalRef?.hide();
        this.addBookForm.reset();
        this.showSnackBar('Book Updated Successfully');
        this.refresh_table();
      },
      (err) => {
        this.is_loading = false;
        console.log(err)
      }
    )

  }

  formatDate(date:Date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
  }

  ngOnDestroy(): void {
    if(this.createBookSubscription){
      this.createBookSubscription.unsubscribe();
    }
    
    if(this.getAuthorSubscription){
      this.getAuthorSubscription.unsubscribe();
    }

    if(this.getBookSubscription){
      this.getBookSubscription.unsubscribe();
    }

  }

}
