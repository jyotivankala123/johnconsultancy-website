import { AbstractControl, FormGroup,ValidationErrors } from '@angular/forms';

export function noSpace(control: AbstractControl) {
	if (control.value && control.value.toString().trim() == '') {
		return { noSpace: true };
	}
	return null;
}

export function creditCardValidator(control: AbstractControl): ValidationErrors | null {
	
	// Remove any whitespace and convert the input to a string
	const number: string = control.value ? control.value.replace(/\s/g, '') : '';
  
	// Check if the input is a number and has at least one digit
	if (!number || isNaN(+number) || number.length < 13) {
	  return { invalidCreditCard: true };
	}
  
	// Perform credit card number validation using the Luhn algorithm
	const reversedDigits: string = number.split('').reverse().join('');
	const doubledDigits: number[] = reversedDigits.split('').map((digit, index) => {
	  const num = +digit;
	  return index % 2 === 1 ? num * 2 : num;
	});
	const summedDigits: number[] = doubledDigits.map(digit => (digit > 9 ? digit - 9 : digit));
	const totalSum: number = summedDigits.reduce((acc, curr) => acc + curr, 0);
  
	if (totalSum % 10 !== 0) {
	  return { invalidCreditCard: true };
	}
  
	return null; // The credit card number is valid
  }
