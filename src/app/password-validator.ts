import { AbstractControl } from '@angular/forms'

export function passwordValidator(
  control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = control.value.password == control.value.rePassword
    //   console.log("control",control.value.password,valid);
  return valid
    ? null
    : { passwordNotMatched : { valid: false, value: control.value.rePassword } }
}