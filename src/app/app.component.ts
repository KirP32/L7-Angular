import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { BookService } from './services/book.service';
import { Book } from './interfaces/book';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, NavBarComponent, RouterModule]
})

export class AppComponent {
  title = 'L7-Angular';
  public books: Book[] = [];
  constructor(
    private bookService: BookService
  ) {
  }
  
}
