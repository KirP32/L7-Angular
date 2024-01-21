import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { BookService } from './services/book.service';
import { Book } from './interfaces/book';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, NavBarComponent]
})

export class AppComponent implements OnInit {
  title = 'L7-Angular';
  public books: Book[] = [];
  constructor(
    private bookService: BookService
  ) {
  }
  public ngOnInit(): void {
    this.loadbooks();
  }
  public addButtonBook(): void {
    this.bookService.addBook().subscribe(() => {
    this.loadbooks();
    });
  }
  private loadbooks() {
    this.bookService.getbooks().subscribe(item => {
      this.books = item;
    });
  }
}
