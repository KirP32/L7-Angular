import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }
  private counter = 1;
  private _books: Book[] = [
    {
      author: "test",
      id: this.counter,
      name: "Крузке"
    }
  ];

  public getbooks(): Observable<Book[]> {
    console.log("getbooks called");
    return of(this._books); 
    
  }
  public addBook(): Observable<any> {
    console.log("addBook called");
    let book: Book = {
      id: ++this.counter,
      name: "Ноунём",
      author: "Ттт ЫЫы"
    };
    this._books.push(book);
    return of() ;
  }
}
