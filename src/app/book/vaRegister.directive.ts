import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  standalone: true
})
export class VaRegisterDirective implements ControlValueAccessor {
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
}
