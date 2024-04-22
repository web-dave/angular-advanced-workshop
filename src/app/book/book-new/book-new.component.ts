import { Component, DestroyRef, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, debounceTime, delay, filter, map, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { JsonPipe, NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of, timer } from 'rxjs';
import { RatingComponent } from '../rating.component';

interface IBookForm {
  title: FormControl<string>;
  subtitle: FormControl<string>;
  // author: FormControl<string>;
  authors: FormArray<FormControl<string>>;
  abstract: FormControl<string>;
  isbn: FormControl<string>;
  cover: FormControl<string>;
  rating: FormControl<number>;
}

const authorValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value === 'Memo' || control.value === 'Simon' ? null : { memo: 'Nur Memo oder Simon ist OK' };
};

const isbn = (): AsyncValidatorFn => {
  const service = inject(BookApiService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // return of(control.value).pipe(
    //   delay(1000),
    //   switchMap(isbnVersuch =>
    //     service.getByIsbn(isbnVersuch).pipe(
    //       map(book => ({ isbn: `Isbn wir schon verwendet fuer: ${book.title}` })),
    //       catchError(() => of(null))
    //     )
    //   )
    // );

    return timer(500).pipe(
      switchMap(() =>
        service.getByIsbn(control.value).pipe(
          map(book => ({ isbn: `Isbn wir schon verwendet fuer: ${book.title}` })),
          catchError(() => of(null))
        )
      )
    );

    // return timer(10, 500).pipe(
    //   map(i => i % 2 === 0),
    //   map(valid => (valid ? null : { isbn: `Isbn wir schon verwendet ` })),
    //   tap(data => console.log(data)),
    //   take(2)
    // );
  };
};

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    MatIconModule,
    RatingComponent,
    JsonPipe
  ]
})
export class BookNewComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);

  protected form: FormGroup<IBookForm> = this.formBuilder.group({
    title: ['Das Buch', [Validators.required]],
    subtitle: [''],
    authors: this.formBuilder.array([] as string[]),
    abstract: ['Foooooo'],
    isbn: ['', [Validators.required, Validators.minLength(3)], [isbn()]],
    cover: [''],
    rating: [7]
  });

  get authors(): FormArray<FormControl<string>> {
    return this.form.controls['authors'];
  }

  addAuthor() {
    this.authors.push(new FormControl('', { nonNullable: true, validators: [authorValidator], asyncValidators: [] }));
  }

  deleteAuthor(i: number) {
    this.authors.removeAt(i);
  }

  constructor() {
    // private readonly destroyRef: DestroyRef // private readonly bookService: BookApiService, // private readonly router: Router, // private readonly formBuilder: NonNullableFormBuilder,
    console.log(this.form.value);
    this.form.controls.abstract.disable();
    console.log(this.form.value);
    const f = this.form.getRawValue();
    console.log(f);
  }

  create() {
    const book: Book = { ...bookNa(), ...this.form.getRawValue() };
    this.bookService
      .create(book)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }

  disableRating() {
    this.form.controls.rating.disabled ? this.form.controls.rating.enable() : this.form.controls.rating.disable();
  }
}
