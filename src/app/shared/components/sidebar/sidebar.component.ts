import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` 
 <ul class="layout-menu">
  @for (section of _model; track $index) {
    <ng-container >
      <br>
      <!-- <h6 style="font-size: 1.1rem;" >{{ section.label }}</h6> -->
      <ul style="font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: 1.5rem;" >
        @for (item of section.items; track $index) {
          <li>
            <a [routerLink]="item.routerLink">
              <i [class]="item.icon" style="width: 30px;"></i>
              {{ item.label }}
            </a>
          </li>
        }    
   
      </ul>
  </ng-container>
  }
   
</ul>
  `,

})
export class SidebarComponent implements OnInit {
  _model: any[] = [];

  layoutService: LayoutService = inject(LayoutService);
  el: ElementRef = inject(ElementRef);
  ngOnInit(): void {

    this._model = [
      {
        label: 'Administración',
        items: [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/admin/inicio'] },
          // { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/admin/usuarios'] },
          // { label: 'Permisos', icon: 'pi pi-fw pi-list', routerLink: ['/admin/permisos'] },
          { label: 'Productos', icon: 'pi pi-fw pi-list', routerLink: ['/admin/productos'] },
          // { label: 'Inventario', icon: 'pi pi-fw pi-list', routerLink: ['/admin/inventario'] },
          // { label: 'Alquiler', icon: 'pi pi-fw pi-book', routerLink: ['/admin/alquiler'] },
          { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/admin/clientes'] },
          // { label: 'Reportes', icon: 'pi pi-fw pi-book', routerLink: ['/'] },
        ]

         
      

      
      }
    ];

}
}

