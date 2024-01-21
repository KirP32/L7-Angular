import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/book';

@Pipe({
  name: 'book',
  standalone: true
})
export class BookPipe implements PipeTransform {
  public transform(item: Book, ...args: unknown[]): string {
    return item.name + " " + item.author;
  }

}
