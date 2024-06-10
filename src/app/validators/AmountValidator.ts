import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function AmountValidator(productAmout?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = control.value;
    if (!productAmout) return null;
    if (amount > productAmout) {
      return { amount: true };
    }
    return null;
  };
}
