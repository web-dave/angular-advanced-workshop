import { Component, DestroyRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface IBookForm {
  title: FormControl<string | null>;
  subtitle: FormControl<string | null>;
  author: FormControl<string | null>;
  abstract: FormControl<string | null>;
  isbn: FormControl<string | null>;
  cover: FormControl<string | null>;
}

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatError, MatButton, RouterLink, MatLabel]
})
export class BookNewComponent {
  protected form: FormGroup<IBookForm> = this.formBuilder.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: ['']
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef
  ) {
    const f = this.form.getRawValue();
  }

  create() {
    const book = { ...bookNa(), ...this.form.getRawValue() } as Book;
    this.bookService
      .create(book)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
