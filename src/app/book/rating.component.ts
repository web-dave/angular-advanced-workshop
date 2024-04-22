import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'book-rating',
  standalone: true,
  template: `
    <label for="rating">Rating</label>
    <input
      id="rating"
      type="number"
      [disabled]="isDisabled"
      [value]="myValue"
      (input)="setRating(ratingInput.value)"
      #ratingInput
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements ControlValueAccessor {
  ratingChange: any = () => {};
  ratingTouched: any = () => {};
  isDisabled = false;
  myValue = 0;

  // wird nur vom FormControl aufgerufen
  writeValue(val: number): void {
    this.myValue = val;
  }

  // FormGroup reicht callback weiter an uns
  registerOnChange(fn: any): void {
    this.ratingChange = fn;
  }

  // FormGroup reicht callback weiter an uns
  registerOnTouched(fn: any): void {
    this.ratingTouched = fn;
  }

  // wird nur vom FormControl aufgerufen
  setDisabledState?(isDisabled: boolean): void {
    console.log('Disabled', isDisabled);

    this.isDisabled = isDisabled;
  }

  setRating(val: string) {
    console.log(val);
    if (!val) {
      val = '0';
    }
    if (!this.isDisabled) {
      this.myValue = parseInt(val, 10);
      this.ratingChange(this.myValue);
      this.ratingTouched();
    }
  }
}
