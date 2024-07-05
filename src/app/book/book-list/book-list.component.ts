import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [BookCardComponent]
})
export class BookListComponent {
  protected $books: Signal<Book[]> = toSignal(inject(BookApiService).getAll(), {
    initialValue: []
  });

  // constructor(private readonly bookService: BookApiService) {
  //   this.books$ = this.bookService.getAll();
  // }
}
