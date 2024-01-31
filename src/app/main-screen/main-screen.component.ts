import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { AddButtonComponent } from './dialogs/add-button/add-button.component';
import { IBook } from '../interfaces/book';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss'
})
export class MainScreenComponent implements OnInit {
  public books: IBook[] = [];
  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private router: Router,
  ) {
  }
  public ngOnInit(): void {
    console.log("ngOnInit called");
    this.loadbooks();
  }
  public addButtonBook(): void {
    const dialogRef = this.dialog.open(AddButtonComponent, {
    });

    dialogRef.afterClosed().subscribe((result: Book) => {
      if (result) {
        this.bookService.addBook(result).subscribe({
          next: () => {
            alert("Added book successfully !");
            this.ngOnInit();
          },
          error: (_) => {
            alert(_);
          }
        });
      }
    });
  }

  public edit_book(book: IBook): void {
    const dialogRef = this.dialog.open(AddButtonComponent, { data: book });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.bookService.edit_book_interface(result);
      }
    });
  }

  private loadbooks() {
    console.log("loadbooks called")
    this.bookService.getbooks().subscribe(item => {
      console.log(item);
      this.books = item;
    });
  }
}
