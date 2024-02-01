import { Injectable } from '@angular/core';
//import { Book, IBookGet, IEditBook } from '../interfaces/book';
import { Observable, of, tap } from 'rxjs';
import { Book, BookRequest, IBook } from '../interfaces/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService
  ) { }
  public counter = 1;
  private _books: IBook[] = [
    {
      name: "test",
      id: `${this.counter}`,
      userId: "0",
      author: "Not Stated",
    }
  ];

  public getbooks(): Observable<IBook[]> {
    // let headers = new HttpHeaders({
    //   ['Content-Type']: 'application/json',
    //   ['Authorization']: `Bearer ${this.authService.authtoken} `,
    // });
    console.log("getbooks called");
    return this.httpClient.get<IBook[]>(environment.apiUrl + 'books');


    // console.log("getbooks called");
    // return of(this._books); 

  }
  
  public addBook(item: Book): Observable<any> {
    let book: BookRequest = {
      name: item.name,
      author: item.author_name + " " + item.author_sename,
    };

    return this.httpClient.post(environment.apiUrl + 'books', JSON.stringify(book))
      .pipe(
        tap({
          error: _ => {
            console.log(_);
          }
        })
      );
    // this._books.push(book);
    //return of();
  }
  public edit_book_interface(item: IBook): Observable<any> {

    let dummy = {
      author: item.author,
      name: item.name,
    }
    return this.httpClient.put(environment.apiUrl + `books/${item.id}`, JSON.stringify(dummy))
    // let i = -1;
    // for (let index = 0; index < this.counter; index++) {
    //   if (item.id == this._books[index].id) {
    //     i = parseInt(item.id);
    //     break;
    //   }
    // }
    // if (i === -1) return of();
    // this._books[i - 1] = item;
    // return of();
  }
  public deleteBook (item: IBook): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `books/${item.id}`)
  }
}
