import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { bookNa } from '../models';
import { createBookStart } from '../store/book-collection.action';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent implements OnDestroy {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.form = this.buildForm();
  }

  ngOnDestroy() {}

  create() {
    const book = { ...bookNa(), ...this.form.value };
    this.store.dispatch(createBookStart({ book }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['']
    });
  }
}
