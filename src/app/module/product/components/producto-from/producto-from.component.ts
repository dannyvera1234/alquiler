import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import { MX_NOMBRE_PRO, MX_DESCRIPCION_PRO, MI_LENGTH_NAME_VARIACIONES } from '../../../../shared/utils/constantes';
import { ValidacionService } from '../../../clientes/services/validacion.service';
import { TableModule } from 'primeng/table';


interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-producto-from',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule,TitleComponent, InputTextModule, TableModule,
    RouterModule],
  templateUrl: './producto-from.component.html',
  styleUrl: './producto-from.component.css'
})
export class ProductoFromComponent implements OnInit {

  [x: string]: any;
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  data: MenuItem[] = [];

  form!: FormGroup;
  ideParam!: string;
  title: string = 'Registro de productos';
  titleVariaciones: string = 'Variaciones';

  productTypes: any[] = [];
  cols: Column[] = [];
  files: TreeNode[] = [];
  hasVariations: boolean = false;

  @ViewChild('table') table!: Table;

  // id para las filas de la tabla
  idRow: number = 0;
  constructor(
    private fb: FormBuilder,
    private validacionService: ValidacionService,
    private activePath: ActivatedRoute) {
    this.initValues();
  }

  /**
   * @description Inicializa los valores del componente
   * @returns void
   */
  private initValues() {

    this.buildForm();

    this.productTypes = [

      { name: 'Alquiler', code: 'ALQUILER' },
      { name: 'Servicio', code: 'SERVICIO' },
      { name: 'Consumible', code: 'CONSUMIBLE' },
    ];

    this.cols = [
      { field: 'ide', header: '#' },
      { field: 'precio', header: 'Precio' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'delete', header: 'Acciones' },
    ];
  }

  /**
   * @description Metodo que se ejecuta cuando se inicia el componente
   * @returns void
   */

  ngOnInit() {
    // this.setParamPath();
    this.buildItems();
    this.triggerValidation();
    // this.changeValuesField();
    // this.setValueEdit();
    console.log(this.table);
  }
  /**
   * @description Construye los items del menu
   * @returns void
   */
  private buildItems() {
    this.title = this.ideParam ? 'Edicion de productos' : 'Registro de productos';
    this.items = [
      { label: 'lista de productos', routerLink: '/dashboard/productos' },
      { label: this.title },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };

    this.data = [
      {
        routerLink: '/dashboard/productos',
      },
    ];
  }

 

  /**
   * @description Construye el formulario
   * @returns void
   */
  private buildForm() {
    this.form = this.fb.group({
      ide: [null, []],
      nombre: ['', [Validators.required, Validators.maxLength(MX_NOMBRE_PRO)]],
      descripcion: ['', [Validators.maxLength(MX_DESCRIPCION_PRO)]],
      cantidad: [1, [Validators.required]],
      foto: ['', []],
      fotoAnterior: ['', []],
      precio: ['', [Validators.required]],
      tipo: [{ name: 'Alquiler', code: 'ALQUILER' }, [Validators.required]],
      variaciones: [null, []],
      valores: ['', []],
      fechaCreacion: ['', []],
      estadoEliminacion: ['', []],
      fechaEliminacion: ['', []],
      idCliente: ['', []],
      newHeader: ['', []],
    });
  }

  /**
   * @description Metodo que valida si un campo es invalido
   * @param field campo a validar
   * @returns true si el campo es invalido
   */
  validField(field: string): boolean {
    return this.validacionService.validField(field, this.form);
  }

  /**
   * @description Obtiene el mensaje de error de un campo
   * @param field campo a validar
   * @returns mensaje de error
   */
  getErrorMessage(field: string, message: string): string {
    return this.validacionService.getErrorMessage(field, message, this.form);
  }

  /**
 * @description Metodo que se ejecuta al enviar el formulario
 * @returns void
 *
 */
  onSubmit() {
    // console.log(this.form.value);
    if (this.form.valid) {

      if (!this.validateVariations()) {
        return;
      }

      const rowVariations = this.files.map((row) => row.data);

      let strValues = JSON.stringify([]);

      if (this.hasVariations && rowVariations.length > 0) {
        strValues = JSON.stringify(rowVariations);
      }

      this.form.get('valores')?.setValue(strValues, { emitEvent: false });
      const request ={
        ...this.form.value,
        tipo: this.form.get('tipo')?.value.code,
      }
     

      const formData = new FormData();
      formData.append('requestStr', JSON.stringify(request));
      console.log(formData.get('requestStr'));
      
      // this.serviceCliente
      //   .save(formData, this.ideParam)
      //   .pipe(
      //     tap((resp) => {
      //       console.log(resp);

      //       alert('Registro guardado con exito');
      //     }),
      //     catchError((err) => {
      //       this.handleErrorHttp(err);

      //       return of(null);
      //     })
      //   )
      //   .subscribe();
    } else {
      // marcar todos los campos como tocados para que se muestren los errores si existen
      this.form.markAllAsTouched();
      alert('Complete los campos requeridos');
    }
  }
  /**
  * @description Metodo que se ejecuta 
  * @returns void
  */
  private triggerValidation() {

    this.form.get('variaciones')?.valueChanges.subscribe((value) => {

      this.hasVariations = value ? true : false;

      if (value) {
        let precio = this.form.get('precio')?.value;
        let cantidad = this.form.get('cantidad')?.value;

        this.files.forEach((row) => {
          row.data.precio = precio ? precio : 0.00;
          row.data.cantidad = cantidad ? cantidad : 1;
        });
      } else {
        this.form.get('variaciones')?.setValue(null, { emitEvent: false });
      }

    }
    );
  }


  /**
   * @description Metodo que agrega una nueva propiedad(titulo-variacion) a la tabla
   * @returns void
   */
  addProperty() {

    let newHeader = this.form.get('newHeader')?.value;
    // console.log(newHeader);

    if (!newHeader) {
      alert('Ingrese un nombre para la nueva propiedad');
      return;
    }

    // validar que el nombre no contenta numeros
    if (newHeader.match(/\d+/g)) {
      alert('El nombre de la propiedad no puede contener numeros');
      return;
    }

    // validar que el nombre tenga al menos 3 caracteres
    if (newHeader.length < MI_LENGTH_NAME_VARIACIONES) {
      alert('El nombre de la propiedad debe tener al menos 3 caracteres');
      return;
    }

    let lowerCaseProperty = newHeader.toLowerCase();
    let propertyCapitalize = lowerCaseProperty.charAt(0).toUpperCase() + lowerCaseProperty.slice(1);

    // comprueba si ya existe una propiedad con ese nombre
    if (this.cols.find((col) => col.field === lowerCaseProperty)) {
      alert('Ya existe una propiedad con ese nombre');
      return;
    }

    // crear el nuevo nodo de la tabla
    const newHeaderNode: Column = {
      field: lowerCaseProperty,
      header: propertyCapitalize,
    }

    // agregar la nueva propiedad a la tabla de variaciones antes de la columna delete
    // this.cols.push(newHeaderNode);
    this.cols.splice(this.cols.length - 1, 0, newHeaderNode);

    // agrgar la nueva propiedad a cada fila
    this.files.forEach((row) => {
      row.data[lowerCaseProperty] = '';
    });

    // limpiar el campo de la nueva propiedad
    this.form.get('newHeader')?.setValue('');
  }

  /**
   * @description Metodo que elimina una propiedad-variacion de la tabla
   * @returns void
   */
  deleteHeader(header: string) {
    this.cols = this.cols.filter((col) => col.field !== header);

    // eliminar la propiedad de cada fila
    this.files.forEach((row) => {
      delete row.data[header];
    });
  }

  removeRow(row: any) {
    console.log(row);
    this.files = this.files.filter((r) => r.key !== row.key);
  }


  /**
   * @description Metodo que valida si las variaciones son correctas
   * @returns void
   */
  private validateVariations(): boolean {

    // si tiene variacion y almenos una fila, se valida
    if (this.hasVariations && this.files.length > 0) {

      // obtener las columnas de la tabla
      let columns = this.cols.map((col) => col.field);

      // si no hay columnas, no se valida
      if (!columns.length) {
        alert('No hay variaciones para validar');
        return false;
      }

      // validar que tenga almenos las columnas precio y cantidad
      if (!columns.includes('precio') || !columns.includes('cantidad')) {
        alert('Debe tener las columnas precio y cantidad');
        return false;
      }

      // obtener las propiedades de cada fila, para validar que no esten vacias
      let rows = this.files.map((row) => row.data);

      // mensaje de error
      let messageError = '';

      // flag que indica si una fila esta vacia
      let rowEmpty = false;

      // flag para romper el ciclo de la fila
      let breakFlag = false;
      rows.forEach((row) => {
        columns.forEach((col) => {

          // valor de la celda de la fila
          const rowColumnValue = row[col];

          // console.log('rowColumnValue   col', rowColumnValue, col);

          // si la celda esta vacia, se marca como fila vacia
          if (!rowColumnValue) {
            rowEmpty = true;
            messageError = 'Complete la columna ' + col + ' de las variaciones';
            breakFlag = true;
          }

          // si la celda no esta vacia, se valida que sea un numero en las columnas precio y cantidad
          // sin embargo si no es un numero, se marca como fila vacia, no llega a esta validacion
          // por seguridad se valida que sea un numero
          if (rowColumnValue) {
            // validar que el precio y la cantidad sean numeros
            if (col === 'precio' || col === 'cantidad') {
              if (isNaN(Number(rowColumnValue))) {
                rowEmpty = true;
                messageError = 'El valor de la columna ' + col + ' debe ser numerico';
                breakFlag = true;
              }
            }
          }

        });
        // si la fila esta vacia, se rompe el ciclo
        if (breakFlag) {
          return;
        }
      });

      if (rowEmpty) {
        alert(messageError);
        return false;
      }
    }

    if (this.hasVariations && this.files.length === 0) {
      alert('Debe agregar al menos una variacion');
      return false;
    }
    return true;
  }

  /**
   * @description Metodo que agrega una nueva fila a la tabla
   * @returns void
   */
  newRowVariacion() {
    console.log(this.files);

    this.idRow = this.idRow + 1;
    let key = this.idRow ;
    let cantidad = this.form.get('cantidad')?.value;
    let precio = this.form.get('precio')?.value;

    // crear nueva fila de la tabla
    let row = {
      data: {
        ide: key,
        precio: precio ? precio : 0.00,
        cantidad: cantidad ? cantidad : 1,
        delete: 'delete'
      },
      children: [],
      key: key.toString()
    }

    this.files.push(row);
    console.log(this.files);
    console.log(this.table);

  }


  /**
   * @description Metodo determina si una columna es requerida
   * @returns void
   */
  isColumnRequired(colName: any): boolean {
    return colName === 'precio' || colName === 'cantidad' ? true : false;

  }

  /**
   * @description Metodo determina el tipo de columna de la tabla
   * @returns void
   */
  typeColumn(colName: any): string {
    return colName === 'precio' || colName === 'cantidad' ? 'number' : 'text';
  }

  /**
   * @description Metodo determina si una columna es editable
   * @returns void
   */
  editableColumnDisabled(colName: any): boolean {
    return colName === 'ide' || colName === 'delete' ? true : false;
  }

  /**
   * @description Metodo determina si se muestra el boton de eliminar columna
   * @returns void
   */
  showBtnDeleteHeader(colName: any): boolean {
    return colName !== 'ide'
      && colName !== 'cantidad'
      && colName !== 'precio'
      && colName !== 'delete';
  }


}
