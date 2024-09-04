import { FormControl } from '@angular/forms';

export interface INewBookForm {
  title: FormControl<string>;
  subtitle: FormControl<string>;
  author: FormControl<string>;
  abstract: FormControl<string>;
  isbn: FormControl<string>;
  cover: FormControl<string>;
}
