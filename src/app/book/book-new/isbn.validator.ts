import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { inject } from '@angular/core';

export const isbnValidator = (control: AbstractControl): ValidationErrors | null => {
  if (control.value == 'AAA') {
    return {
      isbn: 'NUR A'
    };
  }
  return null;
};

export const AsyncIsbnValidator = (): AsyncValidatorFn => {
  const service = inject(BookApiService);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.getByIsbn(control.value).pipe(
      map(book => ({
        isbn: book.isbn + ' ist schon wech!'
      })),
      catchError(() => of(null))
    );
  };
};
