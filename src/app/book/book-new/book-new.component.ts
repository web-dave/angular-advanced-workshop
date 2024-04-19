import { Component, DestroyRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

interface IBookForm {
  title: FormControl<string>;
  subtitle: FormControl<string>;
  // author: FormControl<string>;
  authors: FormArray<FormControl<string>>;
  abstract: FormControl<string>;
  isbn: FormControl<string>;
  cover: FormControl<string>;
}

const authorValidator = (control: AbstractControl): ValidationErrors | null => {
  return control.value === 'Memo' || control.value === 'Simon' ? null : { memo: 'Nur Memo oder Simon ist OK' };
};

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatError, MatButton, RouterLink, MatLabel, MatIconModule]
})
export class BookNewComponent {
  protected form: FormGroup<IBookForm> = this.formBuilder.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    authors: this.formBuilder.array([] as string[]),
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3), authorValidator]],
    cover: ['']
  });

  get authors(): FormArray<FormControl<string>> {
    return this.form.controls['authors'];
  }

  addAuthor() {
    this.authors.push(new FormControl('', { nonNullable: true, validators: [authorValidator] }));
  }

  deleteAuthor(i: number) {
    this.authors.removeAt(i);
  }

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef
  ) {
    const f = this.form.getRawValue();
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
}
