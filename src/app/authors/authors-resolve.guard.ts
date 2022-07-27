import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { BookService } from '../shared/book.service';

@Injectable()
export class AuthorsResolveGuard implements Resolve<any> {
  
  constructor(private bookService:BookService){}
  
  resolve() {
    return this.bookService.getAllAuthors().pipe(
      catchError(err => {
        console.error(err);
        return of();
    })
    );
  }
  
}
