import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { AddButtonComponent } from './dialogs/add-button/add-button.component';
import { IBook } from '../interfaces/book';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [FormsModule],
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
  private flag = false;
  public ngOnInit(): void {
    console.log("ngOnInit called");
    this.loadbooks();
  }
  public addButtonBook(): void {
    const dialogRef = this.dialog.open(AddButtonComponent, {
      width: '300px'
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
    setTimeout(() => {
      if (this.flag == false) {
        const dialogRef = this.dialog.open(AddButtonComponent, { data: book });
        dialogRef.afterClosed().subscribe((result: IBook) => {
          if (result) {
            this.bookService.edit_book_interface(result).subscribe({
              next: () => {
                this.ngOnInit();
              },
              error: (_) => {
                alert(_);
              }
            });
          }
        });
      }
    }, 200);
    this.flag = false;
  }

  private loadbooks() {
    console.log("loadbooks called")
    this.bookService.getbooks().subscribe(item => {
      console.log(item);
      this.books = item;
    });
  }
  public deleteBook(item: IBook): void {
    this.flag = true;
    if (confirm(`Удалить \n ${item.name} ?`)) {
      this.bookService.deleteBook(item).subscribe({
        next: () => {
          console.log("Book deleted successfully");
          this.ngOnInit();
        },
        error: (_) => {
          alert(_);
        }
      });
    }
  }
  public generateBooks(): void {
    let nBooks = document.querySelector("#input-number") as HTMLInputElement;
    let number = parseInt(nBooks.value);
    this.bookService.generateBooks(number).subscribe({
      next: () => {
        console.log("Book generated successfully");
        this.ngOnInit();
      },
      error: (_) => {
        alert(_);
      }
    });
  }
  public deleteAllBooks(): void {
    this.bookService.deleteAllBooks().subscribe({
      next: () => {
        console.log("All books deleted successfully");
        this.ngOnInit();
      },
      error: (_) => {
        alert(_);
      }
    });
  }
}
