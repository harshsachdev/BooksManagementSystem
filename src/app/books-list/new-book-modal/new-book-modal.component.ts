import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shared/book.service';
import { iAuthor, iBook } from 'src/app/shared/iModels';

@Component({
  selector: 'app-new-book-modal',
  templateUrl: './new-book-modal.component.html',
  styleUrls: ['./new-book-modal.component.scss']
})
export class NewBookModalComponent implements OnInit, OnDestroy {

  @Output() refreshTable: EventEmitter<any> = new EventEmitter();
  @Output() showSnackBar: EventEmitter<any> = new EventEmitter();

  constructor( private bookService: BookService) { }

  @ViewChild(ModalDirective, { static: false }) staticModal?: ModalDirective;

  is_loading_text = 'Please wait...';
  is_loading = false;
  max_date = new Date();
  authors:iAuthor[] = [];
  book:iBook = {} as iBook;
  private createBookSubscription: Subscription;
  getAuthorSubscription:Subscription;
  addBookForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getAuthorSubscription = this.bookService.authorsList.subscribe( (data) => {this.authors = data},
    (error) => {console.log(error)})
  }

  initForm(){
    this.addBookForm = new FormGroup({
      'book_title': new FormControl(null, Validators.required),
      'book_price': new FormControl(null, Validators.required),
      'author': new FormControl('', Validators.required),
      'published_year': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.is_loading = true;
    let book_title = this.addBookForm.value.book_title;
    let book_price = this.addBookForm.value.book_price;
    let author = this.addBookForm.value.author;
    let published_year = this.formatDate(this.addBookForm.value.published_year);
    let description = this.addBookForm.value.description;
    
    this.book = {'book_title':book_title,'book_price':book_price, 'author':author, 'published_year':published_year,'description':description};

    this.createBookSubscription = this.bookService.createBook(this.book).subscribe(
      (r) => {
        this.is_loading = false;
        this.staticModal?.hide();
        this.addBookForm.reset();
        this.showSnackBar.emit();
        this.refreshTable.emit();
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
  
  }
 
}
