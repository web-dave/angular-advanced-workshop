import { Component, DestroyRef, effect, inject, input, signal, untracked } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink
  ]
})
export class BookDetailComponent {
  isbn = input.required<string>();
  $book = signal<Book | undefined>(undefined);

  effectRef = effect(() => {
    this.bookService
      .getByIsbn(this.isbn())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.$book.set(data));

    // https://angular.dev/guide/signals#reading-without-tracking-dependencies
    untracked(() => {
      // Signals here won't be counted as dependencies of this effect.
    });
  });

  // @Input({ required: true })
  // set isbn(isbn: string) {
  //   this.book$ = this.bookService.getByIsbn(isbn);
  //   this.isbnValue = isbn;
  // }

  protected book$?: Observable<Book>;
  private isbnValue = '';

  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);

  remove() {
    this.bookService
      .delete(this.isbnValue)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
