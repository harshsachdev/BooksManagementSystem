import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { iAuthor, iBook, ibookDataTable } from './iModels';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor( private httpClient: HttpClient) { }

  private serverUrl: string = 'http://localhost:9000';

  authorsList = new BehaviorSubject<iAuthor[]>([]);

  public getAllAuthors():Observable<iAuthor[]>{
    let dataURL: string = `${this.serverUrl}/authors`;
    return this.httpClient.get<iAuthor[]>(dataURL).pipe(catchError(this.handleError));
  }

  public getAllAuthor(book: iBook):Observable<iAuthor>{
    let dataURL: string = `${this.serverUrl}/authors/${book.author}`;
    return this.httpClient.get<iAuthor>(dataURL).pipe(catchError(this.handleError));
  }

  public createAuthor(author: iAuthor){
    let dataURL: string = `${this.serverUrl}/authors/`;
    return this.httpClient.post<iAuthor>(dataURL, author).pipe(catchError(this.handleError));
  }

  updateAuthor(author: iAuthor, authorId:string|number){
    let dataURL: string = `${this.serverUrl}/authors/${authorId}`;
    return this.httpClient.put<iAuthor>(dataURL, author).pipe(catchError(this.handleError));
  }

  createBook(book: iBook): Observable<iBook>{
    let dataURL: string = `${this.serverUrl}/books/`;
    return this.httpClient.post<iBook>(dataURL, book).pipe(catchError(this.handleError));
  }

  updateBook(book: iBook, bookId:string|number){
    let dataURL: string = `${this.serverUrl}/books/${bookId}`;
    return this.httpClient.put<iBook>(dataURL, book).pipe(catchError(this.handleError));
  }

  deleteBook(bookId:string|number){
    let dataURL: string = `${this.serverUrl}/books/${bookId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  public getBook(bookId:string|number){
    let dataURL: string = `${this.serverUrl}/books/${bookId}`;
    return this.httpClient.get<iBook>(dataURL).pipe(catchError(this.handleError));
  }

  public getAllBooksDataTable(sortby:string, direction:string, page:number, query:string):Observable<ibookDataTable>{
    const href = this.serverUrl+'/books';
    let requestUrl = `${href}?_page=${page+1}&_limit=2&_sort=${sortby}&_order=${direction}`;
    if(query){
      requestUrl += `&q=${query}`;
    }
    return this.httpClient.get<ibookDataTable>(requestUrl,{observe: 'response'}).pipe(map(
      response => {
        // console.log(response.headers.get('X-Total-Count'));
        // console.log(response.body);
        let result_obj:any = {};
        result_obj.total_count = +response.headers.get('X-Total-Count')!;
        result_obj.items = response.body;
        return result_obj;

      }
    ),catchError(this.handleError));
  }

  public getResourceCount(resource:string){
    let requestUrl = `${this.serverUrl}/${resource}?_page=1`;
    return this.httpClient.get<number>(requestUrl, {observe:'response'}).pipe(
      map(
        response => {
          return +response.headers.get('X-Total-Count')!
        }
      ), catchError(this.handleError)
    )
  }

  public handleError(error:HttpErrorResponse){
    let errorMsg:string = '';
    if(error.error instanceof ErrorEvent){
      errorMsg = `Error: ${error.error.message}`;
    }else{
      errorMsg = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError( () => new Error(errorMsg));
  }

}
