import { Component, DestroyRef, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INewBookForm } from '../models/formGroup.interface';
import { MatIconModule } from '@angular/material/icon';
import { AsyncIsbnValidator, isbnValidator } from './isbn.validator';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatButton, RouterLink, MatLabel, MatIconModule]
})
export class BookNewComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);
  protected form: FormGroup<INewBookForm> = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    authors: this.formBuilder.nonNullable.array([new FormControl('', { nonNullable: true })]),
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3), isbnValidator], [AsyncIsbnValidator()]],
    cover: ['']
  });

  get authors(): FormArray<FormControl<string>> {
    return this.form.controls.authors;
  }

  addAuthor() {
    this.authors.push(new FormControl('', { nonNullable: true }));
  }

  deleteAuthor(i: number) {
    console.log(this.authors.value);
    this.authors.removeAt(i);
    console.log(this.authors.value);
  }

  create() {
    const book = { ...bookNa(), ...this.form.getRawValue() };
    this.bookService
      .create(book)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
