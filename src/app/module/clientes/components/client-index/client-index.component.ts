import { ClienteService } from './../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, viewChild } from '@angular/core';
import { GridComponent } from '../../../../shared/components/grid/grid.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-client-index',
  standalone: true,
  imports: [CommonModule,
    TitleComponent, GridComponent, SidebarModule, ButtonModule,
    BreadcrumbModule,
    RouterModule,
  ],
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css'
})
export class ClientIndexComponent implements OnInit {

  title: string = 'Clientes';
  columns = ['Nombre', 'Identificación', 'Celular', 'Dirección', 'Correo'];
  rows: any[] = [];
  router: Router = inject(Router);
  clienteService: ClienteService = inject(ClienteService);
  ngOnInit() {
    this.getClientes();
   
  }

  _boton: any = null;

boton(){
  
  console.log('Función boton() ejecutada desde otro componente');
  this._boton = this.router.navigate(['/admin/clientes/nuevo']);}




  getClientes() {
    this.clienteService.getClientes()
      .pipe(
        tap((resp: any) => {
          const { data } = resp;
          const obj = JSON.parse(data);
          const dataList = obj?.data;
          this.rows = dataList;
          console.log(this.rows);
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe();
  }
}
