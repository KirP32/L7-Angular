import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Book, IBook } from '../../../interfaces/book';
@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss'
})
export class AddButtonComponent implements OnInit {

  public bookform = new FormGroup({
    book_name: new FormControl<string>('', Validators.required),
    author_name: new FormControl<string>('', Validators.required),
    author_sename: new FormControl<string>('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBook,
  ) {

  }
  public ngOnInit(): void {
    if (this.data) {
      this.bookform.get('book_name')?.setValue(this.data.name);
      this.bookform.get('author_name')?.setValue(this.data.author.split(" ")[0]);
      this.bookform.get('author_sename')?.setValue(this.data.author.split(" ")[1]);
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onOK(): void {
    if (this.data) {
      this.onEdit();
    }
    else {
      this.onOkClick();
    }
  }

  private onOkClick(): void {
    let book: Book = {
      name: this.bookform.get("book_name")?.value ?? '',
      author_name: this.bookform.get("author_name")?.value ?? '',
      author_sename: this.bookform.get("author_sename")?.value ?? '',
    }
    this.dialogRef.close(book);
  }


  private onEdit(): void {
    if (!this.data) {
      return;
    }
    let a = this.bookform.get("author_name")?.value ?? '';
    let b = this.bookform.get("author_sename")?.value ?? '';
    let book: IBook = {
      id: this.data.id,
      name: this.bookform.get("book_name")?.value ?? '',
      author: a + " " + b,
      userId: this.data.userId,
    }
    this.dialogRef.close(book);
  }

  


}
