/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable } from '@angular/core'
import { AbstractControl, ValidatorFn } from '@angular/forms'
import { PhoneNumberUtil } from 'google-libphonenumber'

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
      link: `Ingresá un enlace válido`,
      number: `El monto ingresado debe ser un número`,
      targetAmount: `El monto ingresado debe ser mayor a cero`,
      email: `Ingresá un correo electrónico válido`,
      phoneNumber: `Ingresá un número de teléfono válido`,
      required: `Este campo es obligatorio`,
      maxlength: `Debe tener como máximo ${control.errors?.maxlength?.requiredLength} caracteres`,
      minlength: `Debe tener como mínimo ${control.errors?.minlength?.requiredLength} caracteres`,
      pattern: `Formato inválido`,
      min: `La cantidad mínima debe ser de $${control.errors?.min}`,
      whitespace: `No se permiten los espacios en blanco`,
      strongPassword: `Debe incluir al menos una minúscula, una mayúscula y un dígito numérico`,
      firstName: `Ingresá un nombre válido`,
      lastName: `Ingresá un apellido válido`,
      matchPassword: `Las contraseñas no coinciden`,
    }

    if (control.touched || control.dirty) {
      Object.keys(messages).map((error) => {
        if (control.hasError(error)) errors.unshift(messages[error])
      })
    }

    return errors[errors.length - 1]
  }

  // Validators

  isValidFirstName(): ValidatorFn {
    const RegExp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/

    return (control) => (RegExp.test(control.value as string) ? null : { firstName: true })
  }

  isValidLastName(): ValidatorFn {
    const RegExp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/

    return (control) => (RegExp.test(control.value as string) ? null : { lastName: true })
  }

  isValidEmail(): ValidatorFn {
    const RegExp =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/

    return (control) => (RegExp.test(control.value as string) ? null : { email: true })
  }

  isValidPhoneNumber(regionCode = 'AR'): ValidatorFn {
    let validNumber = false
    const phoneNumberUtil = PhoneNumberUtil.getInstance()

    return (control) => {
      try {
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
          control.value as string,
          regionCode,
        )
        validNumber = phoneNumberUtil.isValidNumberForRegion(phoneNumber, regionCode)
      } catch (e) {}
      return validNumber ? null : { phoneNumber: true }
    }
  }

  isStrongPassword(): ValidatorFn {
    const RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/

    return (control) => (RegExp.test(control.value as string) ? null : { strongPassword: true })
  }

  isControlsMatch(controlName: string, matchingControlName: string) {
    return (controls: AbstractControl): void => {
      const control = controls.get(controlName)
      const matchingControl = controls.get(matchingControlName)

      if (matchingControl?.errors) return

      if (control?.value === matchingControl?.value) {
        return matchingControl?.setErrors(null)
      } else {
        return matchingControl?.setErrors({ matchPassword: true })
      }
    }
  }

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
