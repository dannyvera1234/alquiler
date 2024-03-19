import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MX_CEDULA, MI_TELEFONO, MX_TELEFONO } from '../../../shared/utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class ValidacionService {
  constructor() { }

  /**
   * @description Valida si un campo del formulario es invalido
   * @param field campo a validar
   * @returns true si el campo es invalido
   */
  validField(field: string, form: FormGroup): boolean {
    return (form.get(field)?.invalid && form.get(field)?.touched) || false;
  }

  /**
   * @description Obtiene el mensaje de error de un campo
   * @param field campo a validar
   * @returns mensaje de error
   */
  getErrorMessage(field: string, message: string, form: FormGroup): string {
    const { errors } = form.get(field) || {};

    let messageError = '';

    if (errors?.['required']) {
      messageError = `El campo ${message} es obligatorio`;
    } else if (errors?.['pattern']) {
      if (field === 'email') {
        messageError = `El campo ${message} debe ser valido`;
      } else if (field === 'nombres') {
        messageError = `El campo ${message} debe contener solo letras y espacios`;
      } else if (field === 'cedula') {
        messageError = `El campo ${message} debe tener ${MX_CEDULA} numeros`;
      } else if (field === 'telefono') {
        messageError = `El campo ${message} debe tener entre ${MI_TELEFONO} y ${MX_TELEFONO} numeros`;
      } else if (field === 'password') {
        messageError = `El campo ${message} debe tener entre 6 y 16 caracteres, al menos una letra mayuscula y un numero`;
      }
    } else if (errors?.['maxlength']) {
      const { requiredLength } = errors?.['maxlength'];
      messageError = `El campo ${message} puede tener maximo ${requiredLength} caracteres`;
    } else if (errors?.['minlength']) {
      const { requiredLength } = errors?.['minlength'];
      messageError = `El campo ${message} debe tener minimo ${requiredLength} caracteres`;
    } else if (errors?.['min']) {

      const { min } = errors?.['min'];
      messageError = `El campo ${message} debe ser mayor o igual a ${min}`;
    }

    else if (errors?.['invalidCedula']) {
      messageError = errors?.['invalidCedula'];
    } else if (errors?.['mismatchPassword']) {
      messageError = errors?.['mismatchPassword'];
    }

    return messageError;
  }

  /**
   * @description Metodo que elimina los espacios en blanco de ciertos campos del formulario
   * @returns void
   */
  changeValuesField(form: FormGroup<any>): void {
    form.get('email')?.valueChanges.subscribe((value) => {

      // reemplaza los espacios en blanco por un string vacio
      let email = value.replace(/\s/g, '');
      form.get('email')?.setValue(email, { emitEvent: false });
    });

    form.get('cedula')?.valueChanges.subscribe((value) => {
      if (isNaN(Number(value))) {
        form
          .get('cedula')
          ?.setValue(value.replace(/\D/g, ''), { emitEvent: false });
      } else {
        form.get('cedula')?.setValue(value.trim(), { emitEvent: false });
      }
    });

    form.get('telefono')?.valueChanges.subscribe((value) => {
      if (isNaN(Number(value))) {
        form
          .get('telefono')
          ?.setValue(value.replace(/\D/g, ''), { emitEvent: false });
      } else {
        form.get('telefono')?.setValue(value.trim(), { emitEvent: false });
      }
    });

    form.get('password')?.valueChanges.subscribe((value) => {

      // reemplaza los espacios en blanco por un string vacio
      let password = value.replace(/\s/g, '');
      form.get('password')?.setValue(password, { emitEvent: false });
    });

    form.get('repeatPassword')?.valueChanges.subscribe((value) => {

      // reemplaza los espacios en blanco por un string vacio
      let password = value.replace(/\s/g, '');
      form.get('repeatPassword')?.setValue(password, { emitEvent: false });
    });



  }


  /**
   * @description Metodo que maneja los errores http  despues de una peticion
   * @returns void
   */
  handleErrorHttp(httpError: any) {
    const { error } = httpError;

    // message es el mensaje de error que envia el backend, puede ser un string o un objeto
    const message = error?.message;

    // validation true indica que hay errores en los campos
    if (error?.code == '400' && error?.validation) {
      const fields = Object.keys(message);

      // agrupar los mensajes de error en un solo string
      let messageError = '';

      fields.forEach((field) => {
        messageError += ' ' + message[field];
      });

      alert(messageError);
    } else {
      alert(message);
    }
  }
}
