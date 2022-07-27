import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, SortDirection } from '@angular/material/sort';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import {combineLatest, merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { BookService } from '../shared/book.service';
import { iBook } from '../shared/iModels';
import { DeleteBookModalComponent } from './delete-book-modal/delete-book-modal.component';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'book_title', 'published_year', 'book_price', 'edit_book'];
  data: iBook[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService:BookService, private modalService: BsModalService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.bookService.getAllBooksDataTable('id','desc',0).subscribe((res)=>{
    //   console.dir(res);
    // });
    this.bookService.getAllAuthors().subscribe( (data) => {this.bookService.authorsList.next(data)},
    (error) => {console.log(error)})
  }

  ngAfterViewInit() {
    this.fillDataSourceForDataTable();
  }

  performSearch(query:string){
    if(query && query.length){
      this.fillDataSourceForDataTable(true,query);
    }  
  }

  fillDataSourceForDataTable(start_page = false, query = ''){
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    if(start_page){
      this.paginator.pageIndex = 0;
    }
    
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          
          return this.bookService.getAllBooksDataTable(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            query
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          console.log(data);
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        }),
      )
      .subscribe((res) => {
        this.data = res
      });
  }

  bsModalRef?: BsModalRef;

  openModalWithComponent(bookId:number|string, book:iBook) {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component',
        book_id:bookId,
        book_obj:book,
        refresh_table:this.fillDataSourceForDataTable.bind(this),
        showSnackBar:this.openSnackBar.bind(this)
      },
      backdrop:'static'
    };
    this.bsModalRef = this.modalService.show(EditBookModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.setClass('modal-lg');
    // this.bsModalRef.onHide.subscribe(() => {
    //   console.log('res');
      
    //   this.fillDataSourceForDataTable();
    // });
    // this.bsModalRef.content.onSubmit().subscribe(
    //   () => {this.fillDataSourceForDataTable()}
    // );
    // let _combine;
    // if (this.bsModalRef?.onHide && this.bsModalRef?.onHidden) {
    //     _combine = combineLatest(
    //     this.bsModalRef.onHide,
    //     this.bsModalRef.onHidden
    //   ).subscribe(() => this.fillDataSourceForDataTable());
    // }
  }

  deleteBook(book:iBook) {
    const confirmDialog = this.dialog.open(DeleteBookModalComponent, {
      data: {
        title: `Delete ${book.book_title}`,
        message: 'Are you sure, you want to delete an book: ' + book.book_title
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('deleted');
        
        if(book.id){
          this.bookService.deleteBook(book.id).subscribe(res => this.fillDataSourceForDataTable(true));
        }
      
      }
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
