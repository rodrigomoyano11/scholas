import { Injectable } from '@angular/core'
import { AbstractControl, ValidatorFn } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  // Error handler
  getErrors(control: AbstractControl): string {
    return control.errors ? this.selectErrorMessage(control) : ''
  }

  private selectErrorMessage(control: AbstractControl): string {
    const errors: string[] = []

    const messages: { [key: string]: string } = {
      name: `Ingresá un nombre válido`,
      required: `Este campo es obligatorio`,
      link: `Ingresá un enlace válido`,
      number: `El monto ingresado debe ser un número`,
      targetAmount: `El monto ingresado debe ser mayor a cero`,
    }

    if (control.touched || control.dirty) {
      Object.keys(messages).map((error) => {
        if (control.hasError(error)) errors.unshift(messages[error])
      })
    }

    return errors[errors.length - 1]
  }

  // Validators

  isValidTargetAmount(): ValidatorFn {
    const RegExp = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/

    return (control) => (RegExp.test(control.value as string) ? null : { targetAmount: true })
  }

  isNumber(): ValidatorFn {
    const RegExp = /^-?\d*\.?\d*$/

    return (control) => (RegExp.test(control.value as string) ? null : { number: true })
  }
  isValidLink(): ValidatorFn {
    const RegExp =
      /^$|(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

    return (control) => (RegExp.test(control.value as string) ? null : { link: true })
  }
}
