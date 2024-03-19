import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ValidacionService } from '../../services/validacion.service';
import { MX_CEDULA, MI_TELEFONO, MX_TELEFONO, MX_NOMBRES, MX_DIRECCION, MX_EMAIL } from '../../../../shared/utils/constantes';
import { validatorDni } from '../../../../shared/utils/person.validator';
import { tap, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-client-from',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule,TitleComponent, InputTextModule ],
  templateUrl: './client-from.component.html',
  styleUrl: './client-from.component.css'
})
export class ClientFromComponent {

  title: string = 'Registro de clientes';
  _formClient: FormGroup;
  _ideParam!: string;
  fb: FormBuilder = inject(FormBuilder);
  serviceCliente: ClienteService = inject(ClienteService);
  validacionService: ValidacionService = inject(ValidacionService);
  activePath: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this._formClient = this.inicializarFrom();

  }

  inicializarFrom(): FormGroup {
    return new FormGroup({
        ide: new FormControl(null),
        cedula: new FormControl(null,[Validators.required, Validators.pattern(`^[0-9]{${MX_CEDULA}}$`), validatorDni(),],),
        telefono: new FormControl(null,  [Validators.required, Validators.pattern(`^[a-zA-Z ]{0,${MX_NOMBRES}}$`),]),
        nombres: new FormControl(null, [Validators.required, Validators.pattern(`^[a-zA-Z ]{0,${MX_NOMBRES}}$`),],),
        foto: new FormControl(null),
        fotoAnterior: new FormControl(null),
        direccion: new FormControl(null, [Validators.required, Validators.maxLength(MX_DIRECCION)]),
        fechaCreacion: new FormControl(null),
        estadoEliminacion: new FormControl(null),
        fechaEliminacion: new FormControl(null),
        email: new FormControl(null,[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.maxLength(MX_EMAIL),]),
        fechaModificacion: new FormControl(null),
      }
    );
  }

 

    /**
   * @description Metodo que valida si un campo es invalido
   * @param field campo a validar
   * @returns true si el campo es invalido
   */
    validField(field: string): boolean {
      return this.validacionService.validField(field, this._formClient);
    }
  
    /**
     * @description Obtiene el mensaje de error de un campo
     * @param field campo a validar
     * @returns mensaje de error
     */
    getErrorMessage(field: string, message: string): string {
      return this.validacionService.getErrorMessage(field, message, this._formClient);
    }
  
    /**
     * @description Metodo que se ejecuta al enviar el formulario
     * @returns void
     *
     */
    onSubmit() {
      if (this._formClient.valid) {
        const formData = new FormData();
        formData.append('requestStr', JSON.stringify(this._formClient.value));
        this.serviceCliente
          .save(formData, this._ideParam)
          .pipe(
            tap((resp) => {
              console.log(resp);
  
              alert('Registro guardado con exito');
            }),
            catchError((err) => {
              this.handleErrorHttp(err);
  
              return of(null);
            })
          )
          .subscribe();
      } else {
        // marcar todos los campos como tocados para que se muestren los errores si existen
        this._formClient.markAllAsTouched();
      }
    }
  
    handleErrorHttp(httpError: any) {
      return this.validacionService.handleErrorHttp(httpError);
    }
  
    /**
     * @description Metodo que elimina los espacios en blanco de ciertos campos del formulario
     * @returns void
     */
    private changeValuesField() {
      return this.validacionService.changeValuesField(this._formClient);
    }
  
      /**
     * @description Metodo que setea los valores del formulario cuando se esta en modo edicion
     * @returns void
     */
      setValueEdit() {
        if (this._ideParam) {
          this.serviceCliente.getCliente(this._ideParam)
            .pipe(
              tap((resp: any) => {
                console.log(resp);
                const { data } = resp;
    
                this._formClient.patchValue({
                  ide: data.ide,
                  nombres: data.nombres,
                  cedula: data.cedula,
                  email: data.email,
                  telefono: data.telefono,
                  direccion: data.direccion,
                });
                console.log(this._formClient);
              }),
              catchError((err) => {
                console.log(err);
                return of(null);
              })
            )
            .subscribe();
        }
      }
  


}
