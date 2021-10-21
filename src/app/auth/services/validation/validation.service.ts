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

    return (control) => (RegExp.test(control.value) ? null : { firstName: true })
  }

  isValidLastName(): ValidatorFn {
    const RegExp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/

    return (control) => (RegExp.test(control.value) ? null : { lastName: true })
  }

  isValidEmail(): ValidatorFn {
    const RegExp =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/

    return (control) => (RegExp.test(control.value) ? null : { email: true })
  }

  isStrongPassword(): ValidatorFn {
    const RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/

    return (control) => (RegExp.test(control.value) ? null : { strongPassword: true })
  }

  isValidPhoneNumber(regionCode = 'AR'): ValidatorFn {
    let validNumber = false
    const phoneNumberUtil = PhoneNumberUtil.getInstance()

    return (control) => {
      try {
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(control.value, regionCode)
        validNumber = phoneNumberUtil.isValidNumberForRegion(phoneNumber, regionCode)
      } catch (e) {}
      return validNumber ? null : { phoneNumber: true }
    }
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
}
